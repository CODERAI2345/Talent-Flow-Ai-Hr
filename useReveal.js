// Colour gradient picker for company cards
export const CO_GRAD = [
  "linear-gradient(135deg,#0097b2,#7ed957)",
  "linear-gradient(135deg,#F43F5E,#EC4899)",
  "linear-gradient(135deg,#7ed957,#0097b2)",
  "linear-gradient(135deg,#10B981,#7ed957)",
  "linear-gradient(135deg,#F59E0B,#F43F5E)",
  "linear-gradient(135deg,#006d82,#EC4899)",
];
export const coGrad = name => CO_GRAD[(name?.charCodeAt(0)||0) % CO_GRAD.length];

// Stage colour map
export const STAGE_COL = {
  "Public":"#0097b2","Private":"#0097b2","Startup":"#F43F5E",
  "Series A":"#0097b2","Series B":"#006d82","Series C+":"#7ed957","Growth":"#10B981"
};

// India detection helpers
export const INDIA_CITIES = ["bangalore","bengaluru","mumbai","delhi","hyderabad",
  "chennai","pune","kolkata","ahmedabad","jaipur","surat","lucknow","noida","gurgaon",
  "gurugram","indore","chandigarh","coimbatore","kochi","nagpur"];

export const INDIA_KEYWORDS = ["india","indian","rupee","inr","₹","iit","nit",
  "infosys","wipro","tcs","hcl","flipkart","zomato","razorpay","cred","freshworks","zoho"];

export const isIndia = (q="") => {
  const l = q.toLowerCase();
  return INDIA_CITIES.some(c => l.includes(c)) || INDIA_KEYWORDS.some(k => l.includes(k));
};

// Format salary
export const fmtSal = (n, lpa, sym) => {
  if (lpa) {
    const l = n / 100000;
    return (sym || "₹") + (l >= 1 ? l.toFixed(l % 1 === 0 ? 0 : 1) + " LPA" : Math.round(n/1000) + "K");
  }
  return (sym || "$") + (n >= 1000 ? (n/1000).toFixed(0) + "k" : n);
};

// Clearbit domain map
export const KNOWN_DOMAINS = {
  "google":"google.com","meta":"meta.com","facebook":"facebook.com",
  "apple":"apple.com","microsoft":"microsoft.com","amazon":"amazon.com",
  "netflix":"netflix.com","tesla":"tesla.com","nvidia":"nvidia.com",
  "tcs":"tcs.com","infosys":"infosys.com","wipro":"wipro.com",
  "razorpay":"razorpay.com","zomato":"zomato.com","swiggy":"swiggy.com",
  "flipkart":"flipkart.com","paytm":"paytm.com","cred":"getcred.app",
  "meesho":"meesho.com","groww":"groww.in","zepto":"zeptonow.com",
  "ola":"olacabs.com","freshworks":"freshworks.com","zoho":"zoho.com",
  "digitalocean":"digitalocean.com","stripe":"stripe.com",
  "shopify":"shopify.com","airbnb":"airbnb.com","uber":"uber.com",
  "linkedin":"linkedin.com","slack":"slack.com","adobe":"adobe.com",
  "oracle":"oracle.com","ibm":"ibm.com","intel":"intel.com",
  "billdesk":"billdesk.com","phonepe":"phonepe.com","zerodha":"zerodha.com",
  "pine labs":"pinelabs.com","hdfc":"hdfcbank.com","icici":"icicibank.com",
  "naukri":"naukri.com","bajaj":"bajajfinserv.in",
};
