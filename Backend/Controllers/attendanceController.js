import Member from "../models/Member.js";
import WeeklyEvent from "../models/WeeklyEvent.js";


export const saveAttendance = async(req,res)=>{

    try{

        const {
            eventId,
            members
        } = req.body;


        // find event

        const event = await WeeklyEvent.findById(eventId);


        if(!event){
            return res.status(404).json({
                message:"Event not found"
            });
        }



        // update selected members

        for(const memberId of members){


            const member = await Member.findById(memberId);



            if(member){


                member.runningStats.totalDistance += 
                    Number(event.distance);


                member.runningStats.totalEvents += 1;



                await member.save();

            }

        }



        res.status(200).json({

            success:true,

            message:"Attendance saved and stats updated"

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};