import { buildOverviewPrompt } from "../ai/prompts/overview.prompt.js";
import { overViewReportGenerateByAi } from "../ai/services/overview.service.js";
import StartUpProject, { calculateProjectStatus } from "../models/startup.models.js";

export async function generateOverview(req, res) {
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

    const { title, idea, industry, country } = project;

    const overviewReport = await overViewReportGenerateByAi({
      title,
      idea,
      industry,
      country,
    });

    project.overview = overviewReport;
    project.status = calculateProjectStatus(project);
    await project.save();

    return res.status(200).json({
      success: true,
      data: overviewReport,
    });
  } catch (error) {
    console.error("Error generating overview:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate overview",
    });
  }
}