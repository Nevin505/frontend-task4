"use client";
import loginPageStyles from "./loginPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUserDetails } from "@/Services/Api/User";

import Image from "next/image";
import { UserDetails } from "@/types/Cutsomtypes";

import dashBoardPageStyles from "./dashboard.module.css";
// import UserDetails
const UserLandingPage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);
// To set the api Response
  const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

//to Shown the Loading Stage
  const[isLoading,setIsLoading]=useState<boolean>(true);

  useEffect(() => {
    // Function to fetch user details from the server
    const retrieveUserDetails = async () => {
      try {
        // console.log(userId);
        const userId = sessionStorage.getItem("userId");
        // Corrected the typo in the variable name `response`
        const response = await axios.get(`${fetchUserDetails}/${userId}`);

        // Checking if the response status is not 200 (OK)
        if (response.status !== 200) {
          throw new Error("Error");
        }

        // Setting the user details state with the fetched data
        setUserDetails(response.data);
      } catch (error) {
        setApiResponseMessage("An UnExpected Error Occurred!Please Try Again After Sometime")
        // Handling errors that might occur during the API call
        console.error("Failed to fetch user details:", error);
      }
      finally{
        setIsLoading(false)
      }
    };
    retrieveUserDetails();
  }, []);

  // Array for displaying KYC details with their verification status
  const kycDetails = [
    {
      label: "Pan Card Details",
      value: userDetails?.panCard,
      isVerified: userDetails?.isPanVerified,
    },
    {
      label: "Aadhaar Card Details",
      value: userDetails?.addhaarId,
      isVerified: userDetails?.isAadhaarVerified,
    },
    {
      label: "GSTIN ",
      value: userDetails?.gstNumber,
      isVerified: userDetails?.isGstVerifed,
    },
    {
      label: "Bank Account",
      value: userDetails?.accountNumber,
      isVerified: userDetails?.isBankAccountVerified,
    },
  ];
  const userInfoFields = [
    { label: "User Name", value: userDetails?.userName },
    { label: "Email", value: userDetails?.email },
    { label: "Date of Birth", value: userDetails?.dateOfBirth || "N/A" },
    { label: "Password", value: userDetails?.password },
  ];

// If the Serve Went Down
  if(apiResponseMessage){
    return <div className={dashBoardPageStyles.apiServor}>
        <h1>{apiResponseMessage}</h1>
    </div>
  }
 // Loading state
 if (isLoading) {
  return (
    <div className={dashBoardPageStyles.loadingContainer}>
      <h1>Loading user details...</h1>
      <div className={dashBoardPageStyles.loadingSpinner}></div>
    </div>
  );
}
  return (
    <div className={dashBoardPageStyles.dashBoardMainContainer}>
      <h1>User Details</h1>
      <h2>Basic Infos</h2>
      <div className="userInfoContainer">
        {userInfoFields.map((field, index) => (
          <div key={index} className={dashBoardPageStyles.userInfoItem}>
            <p className={dashBoardPageStyles.userInfoLabel}>
              {field.label}: {field.value}
            </p>
            <span className={dashBoardPageStyles.verifiedBadge}>Verified</span>
          </div>
        ))}
      </div>

      <h2>Kyc Details</h2>
      <div className={dashBoardPageStyles.kycDetailsContainer}>
        {kycDetails.map((detail, index) => (
          <div key={index} className={dashBoardPageStyles.kycDetails}>
            <p>{detail.label}</p>
            <p>{detail.value || "N/A"}</p>
            <p className={dashBoardPageStyles.verifiedContainer}>
              Verified:
              <Image
                src={detail.isVerified ? "/icons/tick.svg" : "/icons/cross.svg"}
                width={20}
                height={20}
                alt={detail.isVerified ? "Tick Icon" : "Cross Icon"}
              />
            </p>
          </div>
        ))}
      </div>

      <div className={dashBoardPageStyles.fieldsToBeVerified}>
      {kycDetails.map((field, index) => {
    return !field.isVerified && <p key={index}>{field.label} Needs To Be Verified</p>;
})}
      </div>
    </div>
  );
};

export default UserLandingPage;
