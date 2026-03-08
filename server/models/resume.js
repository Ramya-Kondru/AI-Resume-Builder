import mongoose from 'mongoose';

const ResumeSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:{type:String,default:'Untitled Resume'},
    public:{type:Boolean,default:false},
    template:{type:String,default:'classic'},
    accent_color:{type:String,default:'#3B82F6'},
    professional_summary:{type:String,default:""},
    skills:[{type:String}],
    personal_info:{
        image:{type:String,deafult:''},
        full_name:{type:String,deafult:''},
        profession:{type:String,deafult:''},
        email:{type:String,deafult:''},
        phone:{type:String,deafult:''},
        location:{type:String,deafult:''},
        linkedin:{type:String,deafult:''},
        website:{type:String,deafult:''}, 
    },
    experience:[
        {
            company:{type:String},
            position:{type:String},
            start_date:{type:String},
            end_date:{type:String},
            description:{type:String},
            is_curent:{type:Boolean},
        }
    ],
    project:[
        {
          name:{type:String},
            type:{type:String},
            description:{type:String}, 
        }
    ],
    education:[
        {institution:{type:String},
            degree:{type:String},
            field:{type:String},
            graduation_date:{type:String},
            gpa:{type:String},
          }
    ],
},{timestamps:true,minimize:false})

// minimize:false-it will create resume data using empty object also



const Resume=mongoose.model('Resume',ResumeSchema)

export default Resume