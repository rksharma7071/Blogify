import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ConfirmModel from '../../../../components/common/ConfirmModel';
// import ConfirmModel from '../../../components/common/ConfirmModel';

function SocialLinks() {
    const [socialLinks, setSocialLinks] = useState({
        facebook: "",
        instagram: "",
        twitter: "",
        linkedIn: "",
        snapchat: "",
        pinterest: ""
    })
    const [userId, setUserId] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);

    const getUserWithId = async (userId) => {
        try {
            const response = await axios.get(`/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user", error.response?.data || error.message);
            return null;
        }
    };
    const onClose = () => {
        setResponseMessage(null);
    }
    const onConfirm = () => {
        setResponseMessage(null);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSocialLinks((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) return;
        try {
            const response = await axios.patch(`/api/users/${userId}`, socialLinks);
            // alert("Social links updated successfully!");
            setResponseMessage({
                message: "Social links updated successfully!",
                type: "success"
            });

            // console.log("Social Links: ", socialLinks);
            // console.log("Social Links: ", response.data);

        } catch (error) {
            setResponseMessage({
                message: error.response?.data?.message || "Failed to update social links.",
                type: "error"
            });
            // console.log("Social Links Error: ", error)
        }
    }

    useEffect(() => {
        const { id } = JSON.parse(localStorage.getItem("user"));
        setUserId(id);

        const fetchSocialLinks = async () => {
            try {

                const user = await getUserWithId(id);

                if (user) {
                    setSocialLinks({
                        facebook: user.socialLinks.facebook || "",
                        instagram: user.socialLinks.instagram || "",
                        twitter: user.socialLinks.twitter || "",
                        linkedIn: user.socialLinks.linkedIn || "",
                        snapchat: user.socialLinks.snapchat || "",
                        pinterest: user.socialLinks.pinterest || ""
                    });
                }
            } catch (e) {
                console.error("Failed to load user: ", e);
            }
        }
        fetchSocialLinks();
    }, [])

    return (

        <div className="w-full mx-auto p-6 bg-white">

            {responseMessage && (
                
                <ConfirmModel
                    title={responseMessage.type === "success" ? "Success" : "Error"}
                    subtitle={responseMessage.message}
                    subtitle1=""
                    type={responseMessage.type}
                    onClose={onClose}
                    onConfirm={onConfirm}
                />
            )}
            <h1 className="text-2xl mb-4">Social Links</h1>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6">
                <div className="pb-4">
                    <label className="block text-gray-700 font-medium mb-1">Facebook</label>
                    <input
                        type="text"
                        name="facebook"
                        value={socialLinks.facebook}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className='pb-4'>
                    <label className="block text-gray-700 font-medium mb-1">Instagram</label>
                    <input
                        type="text"
                        name="instagram"
                        value={socialLinks.instagram}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>

                <div className="pb-4">
                    <label className="block text-gray-700 font-medium mb-1">Twitter</label>
                    <input
                        type="text"
                        name="twitter"
                        value={socialLinks.twitter}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="pb-4">
                    <label className="block text-gray-700 font-medium mb-1">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedIn"
                        value={socialLinks.linkedIn}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="pb-4">
                    <label className="block text-gray-700 font-medium mb-1">Snapchat</label>
                    <input
                        type="text"
                        name="snapchat"
                        value={socialLinks.snapchat}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="pb-4">
                    <label className="block text-gray-700 font-medium mb-1">Pinterest</label>
                    <input
                        type="text"
                        name="pinterest"
                        value={socialLinks.pinterest}
                        onChange={handleChange}
                        className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
                    />
                </div>



                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SocialLinks