import { audienceReportGenerateByAi } from "../ai/services/audience.ai.js";
import StartUpProject, { calculateProjectStatus } from "../models/startup.models.js";

async function generateAudience(req, res) {
  try {
    const project = await StartUpProject.findOne({
      _id: req.params.id,
      owner: req.user,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const audienceReport = await audienceReportGenerateByAi({
      title: project.title,
      idea: project.idea,
      industry: project.industry,
      country: project.country,
    });

    project.audience = audienceReport;
    project.status = calculateProjectStatus(project);
    await project.save();

    return res.status(200).json({
      success: true,
      data: audienceReport,
    });
  } catch (error) {
    console.error("Error generating overview:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate business",
    });
  }
}

export default generateAudience;