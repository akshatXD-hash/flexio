export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            message: "Successfully logged out"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
