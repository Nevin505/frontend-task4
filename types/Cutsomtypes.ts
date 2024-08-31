export type NavigationLink ={
    navLabel: string; // The label to display for the navigation link
    href: string; // The URL to navigate to
    icon: string; // The path to the icon image
    alt: string; // The alt text for the icon
}
// User Schema
export type UserDetails ={
    _id: string;
    userName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    isMailVerfied: boolean;
    isPhoneVerfied: boolean;
    addhaarId: string;
    isAadhaarVerified: boolean;
    panCard: string;
    accountNumber: string | null;
    gstNumber: string;
    isGstVerifed: boolean;
    isPanVerified: boolean;
    isBankAccountVerified: boolean;
    isAccountVerified: boolean;
    __v: number;
    phoneNumber: string;
  }