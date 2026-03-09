import React, { useState, useEffect, useRef, useCallback } from "react";

function CompanyLogo({ name, logoUrl, grad, stCol, initials }) {
  const [status, setStatus] = useState("loading"); // loading | ok | err

  // Known domains for popular companies
  const KNOWN = {
    "google":"google.com","meta":"meta.com","facebook":"facebook.com",
    "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
    "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
    "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
    "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
    "flipkart":"flipkart.com","paytm":"paytm.com","byju":"byjus.com",
    "cred":"getcred.app","meesho":"meesho.com","groww":"groww.in",
    "digitalocean":"digitalocean.com","stripe":"stripe.com",
    "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
    "linkedin":"linkedin.com","twitter":"twitter.com","slack":"slack.com",
    "salesforce":"salesforce.com","adobe":"adobe.com","oracle":"oracle.com",
    "ibm":"ibm.com","intel":"intel.com","qualcomm":"qualcomm.com",
    "zensar":"zensar.com","bristlecone":"bristlecone.com",
    "digicert":"digicert.com","sikich":"sikich.com",
    "fanatics":"fanatics.com","creditsafe":"creditsafe.com",
  };

  const key = (name||"").toLowerCase().replace(/[^a-z]/g,"");
  const knownDomain = Object.entries(KNOWN).find(([k])=>key.includes(k))?.[1];
  const finalUrl = knownDomain
    ? `https://logo.clearbit.com/${knownDomain}`
    : logoUrl;

  if (status === "ok") {
    return (
      <div style={{
        width:80, height:80, borderRadius:18,
        background:"rgba(255,255,255,.97)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden", flexShrink:0,
        boxShadow:`0 8px 28px rgba(0,0,0,.45), 0 0 0 2px ${stCol}30`,
        zIndex:2, position:"relative",
      }}>
        <img src={finalUrl} alt={name}
          style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }}/>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <>
        <img src={finalUrl} alt={name} style={{display:"none"}}
          onLoad={()=>setStatus("ok")}
          onError={()=>setStatus("err")}/>
        {/* show styled initials while loading */}
        <StyledInitials grad={grad} stCol={stCol} initials={initials} name={name}/>
      </>
    );
  }

  // fallback: styled gradient initials tile
  return <StyledInitials grad={grad} stCol={stCol} initials={initials} name={name}/>;
}

export default CompanyLogo;
