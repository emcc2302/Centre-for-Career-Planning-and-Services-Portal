// frontend/src/components/JobCard.jsx

import React, { useState } from 'react';
import ApplyModal from './ApplyModal';

// --- IMPORTANT: Adjust these imports based on your file structure ---
// 1. Import API functions
import { upvoteJob, downvoteJob } from '../api/jobsApi'; 
// 2. Import your Authentication hook/context
import { useAuth } from '../context/AuthContext'; 
// -------------------------------------------------------------------

const JobCard = ({ job: initialJob }) => {
    // Get the student's authentication token
    // (Assuming useAuth returns { token })
    const { token } = useAuth(); 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Local state to manage the dynamic score and the student's vote status
    // ASSUMPTION: 'initialJob' includes 'score' (number) and 'studentVoteStatus' (string: 'NONE', 'UPVOTED', 'DOWNVOTED')
    const [jobData, setJobData] = useState({
        score: initialJob.score || 0, 
        studentVoteStatus: initialJob.studentVoteStatus || 'NONE',
    });

    const handleVote = async (voteType) => {
        if (!token) {
            alert("You must be logged in to vote on job relevance.");
            return; 
        }

        const jobId = initialJob._id;
        const apiCall = voteType === 'upvote' ? upvoteJob : downvoteJob;
        const newStatus = voteType === 'upvote' ? 'UPVOTED' : 'DOWNVOTED';

        try {
            // Call the appropriate backend function with the token
            const updatedJob = await apiCall(jobId, token); 

            // Update the local state with the new score and status
            setJobData({
                // ASSUMPTION: The updatedJob response has a 'score' field
                score: updatedJob.score, 
                studentVoteStatus: newStatus,
            });

        } catch (error) {
            console.error(`Error during ${voteType}:`, error);
            // Revert state change or show error to user
            alert(`Failed to submit vote. Please try again. Error: ${error.message}`);
        }
    };

    return (
        <div className="job-card">
            <div className="job-info">
                <h3>{initialJob.title}</h3>
                <p>{initialJob.company}</p>
            </div>

            {/* --- NEW: Voting System Container --- */}
            <div className="job-relevance-vote">
                <button
                    className={`vote-btn upvote ${jobData.studentVoteStatus === 'UPVOTED' ? 'highlighted' : ''}`}
                    onClick={() => handleVote('upvote')}
                    aria-label="Upvote job relevance"
                >
                    &#9650; {/* Up-arrow icon */}
                </button>

                <span className="relevance-score">
                    {jobData.score}
                </span>

                <button
                    className={`vote-btn downvote ${jobData.studentVoteStatus === 'DOWNVOTED' ? 'highlighted' : ''}`}
                    onClick={() => handleVote('downvote')}
                    aria-label="Downvote job relevance"
                >
                    &#9660; {/* Down-arrow icon */}
                </button>
            </div>
            {/* -------------------------------------- */}

            <button
                className="btn-apply"
                onClick={() => setIsModalOpen(true)}
            >
                Apply
            </button>

            {isModalOpen && (
                <ApplyModal
                    jobId={initialJob._id}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default JobCard;