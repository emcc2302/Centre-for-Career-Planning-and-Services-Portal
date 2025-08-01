import JobApplication from "../models/JobApplication.model.js";
import JobPosting from "../models/jobPosting.model.js";

export const getStudentApplications = async (req, res) => {
  try {
    const studentId = req.userId;
    const applications = await JobApplication.find({ studentId }).populate("jobId");

    const onCampusApplications = [];
    const offCampusApplications = [];

    for (let app of applications) {
      if (!app.jobId || !app.jobId.Type) continue;

      const jobType = app.jobId.Type;

      if (jobType === "on-campus") {
        onCampusApplications.push(app);
      } else if (jobType === "off-campus") {
        offCampusApplications.push(app);
      }
    }

    res.status(200).json({
      success: true,
      onCampusApplications,
      offCampusApplications
    });
  } catch (err) {
    console.log("Error getStudentApplications:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student applications",
      error: err.message
    });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const studentId = req.userId;
    const { jobId, resume, phone, address } = req.body;

    // if (
    //   !jobId ||
    //   !resume ||
    //   !phone ||
    //   !address
    // ) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "All fields required" });
    // }

    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });
    }

    const alreadyApplied = await JobApplication.findOne({ studentId, jobId });
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ success: false, message: "Already applied" });
    }

    const application = new JobApplication({
      studentId,
      jobId,
      resume,
      phone,
      address,
      status: "applied"
    });
    await application.save();

    return res
      .status(201)
      .json({ success: true, message: "Application submitted", application });

  } catch (err) {
    console.error("Apply error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};


export const cancelApplication = async (req, res) => {
  try {
    const studentId = req.userId;
    const { jobId } = req.params;

    const application = await JobApplication.findOneAndDelete({ studentId, jobId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found or already withdrawn"
      });
    }

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to withdraw application",
      error: err.message
    });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await JobApplication.find({ jobId }).populate("studentId", "-password");

    res.status(200).json({
      success: true,
      applicants: applications
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applicants",
      error: err.message
    });
  }
};