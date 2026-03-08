// controller for creating new resume
// POST:/api/resume/create

import imagekit from "../configs/imageKit.js";
import Resume from "../models/resume.js";
import fs from 'fs';

export const createResume = async (req, res) => {
    try {
        const userId = req.userId
        const { title } = req.body;

        // create new resume
        const newResume = await Resume.create({ userId, title })

        // return success message
        return res.status(201).json({ message: 'Resume created successfully', resume: newResume })


    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}


// controller for deleting resume
// DELETE:/api/resumes/delete

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId } = req.params;

        //    👉 Delete only if:Resume ID matches AND resume belongs to this user
        await Resume.findOneAndDelete({ userId, _id: resumeId })

        // return success message
        return res.status(200).json({ message: 'Resume deletd successfully' })


    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}


// get user resume by id
// GET:/api/resumes/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId } = req.params;


        const resume = await Resume.findOne({ userId, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' })
        }
        // remove unnecessary fields and return clean resume
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        // return success message
        return res.status(200).json({ resume })


    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}


// get resume by id public
// GET:/api/resumes/public
// View resume publicly (without login).

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId })
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' })
        }
        return res.status(200).json({resume});

    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}

// controller for updating a resume
// PUT:/api/resumes/update
// to update we need both resumeId and userId
export const updateResume = async (req, res) => {
    try {
        // req.userId will be available using middleware
        const userId = req.userId
        const { resumeId, resumeData, removeBackgorund } = req.body
        // we will also get image by request but it will be handled by middleware
        // use the 'image kit' to upload the images on cloud and transform them
        const image = req.file;

        let resumeDataCopy; 
        if(typeof resumeData=='string'){
            resumeDataCopy=await JSON.parse(resumeData)
        }else{
            resumeDataCopy=structuredClone(resumeData)
        }

        if (image) {

            const imageBufferData=fs.createReadStream(image.path)
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder:'user-resumes',
                transformation:{
                    pre:'w-300,h-300,fo-face,z-0.75' + (removeBackgorund?',e-bgremove':'')
                }
                // transformation for width ,height ,facefocus,zoomout and removebackground
            });
            resumeDataCopy.personal_info.image=response.url
        }
        const resume = await Resume.findByIdAndUpdate({ userId, _id: resumeId }, resumeDataCopy,
            { new: true }
        )
        return res.status(200).json({ message: 'Saved successfully', resume })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

