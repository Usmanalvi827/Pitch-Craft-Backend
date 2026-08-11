import StartUpProject, { getCompletedModulesCount } from "../models/startup.models.js";
import UserModel from "../models/users.models.js";

async function startUpFormRegister(req, res) {
  const { title, idea, industry, country, status } = req.body;

  if (!title || !idea || !industry || !country || !status) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await UserModel.findById(req.user); // req.user is ID from token

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const project = await StartUpProject.create({
    title,
    idea,
    industry,
    country,
    status,
    owner: user._id, // store ID
  });

  res.json({
    message: "Startup registered successfully",
    project,
    ownerUsername: user.username, // return username in response
  });
}

async function startUpSingleGet(req, res) {
  try {
    const singlepROJ = await StartUpProject.findOne({
      _id: req.params.id,
      owner: req.user,
    });

    if (!singlepROJ) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project fetched successfully",
      singlepROJ,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function startUpGetAll(req, res) {
  try {
    const projects = await StartUpProject.find({ owner: req.user }).select(
      "title idea industry country status overview businessModel audience features landingPage pitch createdAt updatedAt",
    );

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this user" });
    }

    // sub-docs are only selected to compute modulesCompleted - the actual
    // generated content doesn't need to travel in the list response
    const projectsWithProgress = projects.map((project) => ({
      _id: project._id,
      title: project.title,
      idea: project.idea,
      industry: project.industry,
      country: project.country,
      status: project.status,
      modulesCompleted: getCompletedModulesCount(project),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    return res.status(200).json({
      message: "Projects fetched successfully",
      count: projectsWithProgress.length,
      projects: projectsWithProgress,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function startUpFormUpdate(req, res) {
  const { title, idea, industry, country, status } = req.body;

  if (!title || !idea || !industry || !country || !status) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const project = await StartUpProject.findOneAndUpdate(
      { _id: req.params.id, owner: req.user },
      { title, idea, industry, country, status },
      { new: true },
    );

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or not owned by user" });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function startUpDelete(req, res) {
  try {
    const project = await StartUpProject.findOneAndDelete({
      _id: req.params.id,
      owner: req.user,
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or not owned by user" });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
      deletedProject: project,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function allStartUpPitchReport(req, res) {
  try {
    const pitch = await StartUpProject.findOne({
      _id: req.params.id,
      owner: req.user,
    }).select(
      "title idea overview businessModel audience features landingPage pitch status",
    );

    if (!pitch) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Pitch get Successfully",
      data: pitch,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

export {
  startUpFormRegister,
  startUpGetAll,
  startUpFormUpdate,
  startUpDelete,
  startUpSingleGet,
  allStartUpPitchReport,
};