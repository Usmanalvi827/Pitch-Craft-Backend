import { businessReportGenerateByAi } from "../ai/services/business.ai.js";
import StartUpProject, { calculateProjectStatus } from "../models/startup.models.js";

async function generateBusiness(req, res) {
  try {
    const project = await StartUpProject.findOne({
      _id: req.params.id,
      owner: req.user,
    });

    // console.log(project)

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // console.log(project[0].title)

    // console.log("-->>console", {
    //   title: project[0].title,
    //   idea: project[0].idea,
    //   industry: project[0].industry,
    //   country: project[0].country,
    // });

    const businessReport = await businessReportGenerateByAi({
      title: project.title,
      idea: project.idea,
      industry: project.industry,
      country: project.country,
    });

    // Save AI output to the document
    project.businessModel = businessReport;
    project.status = calculateProjectStatus(project);
    await project.save();

    return res.status(200).json({
      success: true,
      data: businessReport,
    });
  } catch (error) {
    console.error("Error generating overview:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate business",
    });
  }
}

export default generateBusiness;