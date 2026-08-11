import mongoose from "mongoose";

const StartUpSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    idea: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    overview: {
      problem: { type: String, default: "" },
      solution: { type: String, default: "" },
      mission: { type: String, default: "" },
      vision: { type: String, default: "" },
      valueProposition: { type: String, default: "" },
    },

    businessModel: {
      revenueModel: { type: String, default: "" },
      pricing: { type: String, default: "" },
      costStructure: { type: String, default: "" },
      channels: { type: [String], default: [] },
      keyPartners: { type: [String], default: [] },
    },

    audience: {
      targetAudience: { type: String, default: "" },
      customerPersona: { type: String, default: "" },
      painPoints: { type: [String], default: [] },
      marketSize: { type: String, default: "" },
    },

    features: {
      coreFeatures: { type: [String], default: [] },
      futureFeatures: { type: [String], default: [] },
      techStack: { type: [String], default: [] },
    },

    landingPage: {
      headline: { type: String, default: "" },
      subHeadline: { type: String, default: "" },
      callToAction: { type: String, default: "" },
      sections: { type: [String], default: [] },
    
  // Optional: store generated UI code
  html: { type: String, default: "" },
  css: { type: String, default: "" },
    },

    pitch: {
      elevatorPitch: { type: String, default: "" },
      investorPitch: { type: String, default: "" },
      presentation: { type: String, default: "" },
    },

    status: {
      type: String,
      enum: ["draft", "in-progress", "completed"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const StartUpProject = mongoose.model("startup", StartUpSchema);

// one representative field per section - the AI services always fill
// every field in a section together, so checking one is enough to know
// whether that module has been generated
const SECTION_CHECKS = {
  overview: (section) => !!section?.problem,
  businessModel: (section) => !!section?.revenueModel,
  audience: (section) => !!section?.targetAudience,
  features: (section) => (section?.coreFeatures?.length || 0) > 0,
  landingPage: (section) => !!section?.headline,
  pitch: (section) => !!section?.elevatorPitch,
};

export function getCompletedModulesCount(project) {
  return Object.entries(SECTION_CHECKS).filter(([key, isGenerated]) =>
    isGenerated(project[key]),
  ).length;
}

export function calculateProjectStatus(project) {
  const completed = getCompletedModulesCount(project);
  if (completed === 6) return "completed";
  if (completed > 0) return "in-progress";
  return "draft";
}

export default StartUpProject;