import doctorService from "../service/doctorServicec"


let getTopDoctorHome = async (req,res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: "Error from Server!",
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome
}