import React from "react";

export const SettingsSidebar = () => {
  return (
    <>
<aside className="fixed top-0 right-0 z-[99999] h-full w-72 overflow-y-auto bg-white p-3 shadow-xl transition-transform duration-300 ease-in-out xl:static xl:z-auto xl:block xl:w-62.5 xl:translate-x-0 xl:border-r xl:border-gray-200 xl:shadow-none dark:border-gray-800 dark:bg-gray-900 translate-x-full">
 <div className="space-y-4">
  <div className="relative">
   <button className="flex w-full items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/5" type="button">
    <div className="flex items-center gap-2.5">
     <div className="bg-brand-400 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white">
      M
     </div>
     <div className="text-left">
      <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
       Musharof Chy
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">
       Personal
      </p>
     </div>
    </div>
    <svg aria-hidden="true" className="size-5 shrink-0 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
     <path d="M5.833 7.5 10 3.333 14.167 7.5M5.833 12.5 10 16.667 14.167 12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333">
     </path>
    </svg>
   </button>
  </div>
  <div>
   <p className="mb-0.5 block px-3 py-1 text-xs text-gray-400 uppercase">
    Account
   </p>
   <div className="space-y-0.5">
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition bg-gray-100 font-medium text-gray-800 dark:bg-white/5 dark:text-white/90" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M8.0254 6.17845C8.0254 4.90629 9.05669 3.875 10.3289 3.875C11.601 3.875 12.6323 4.90629 12.6323 6.17845C12.6323 7.45061 11.601 8.48191 10.3289 8.48191C9.05669 8.48191 8.0254 7.45061 8.0254 6.17845ZM10.3289 2.375C8.22827 2.375 6.5254 4.07786 6.5254 6.17845C6.5254 8.27904 8.22827 9.98191 10.3289 9.98191C12.4294 9.98191 14.1323 8.27904 14.1323 6.17845C14.1323 4.07786 12.4294 2.375 10.3289 2.375ZM8.92286 11.03C5.7669 11.03 3.2085 13.5884 3.2085 16.7444V17.0333C3.2085 17.4475 3.54428 17.7833 3.9585 17.7833C4.37271 17.7833 4.7085 17.4475 4.7085 17.0333V16.7444C4.7085 14.4169 6.59533 12.53 8.92286 12.53H11.736C14.0635 12.53 15.9504 14.4169 15.9504 16.7444V17.0333C15.9504 17.4475 16.2861 17.7833 16.7004 17.7833C17.1146 17.7833 17.4504 17.4475 17.4504 17.0333V16.7444C17.4504 13.5884 14.8919 11.03 11.736 11.03H8.92286Z" fill="currentColor" fillRule="evenodd">
      </path>
     </svg>
     Account
    </button>
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6535 5.90482C14.6534 4.485 13.5025 3.33398 12.0826 3.33398C10.6628 3.33398 9.51182 4.485 9.5118 5.90482M14.6535 5.90482C14.6535 7.32465 13.5025 8.47565 12.0826 8.47565C10.6628 8.47565 9.5118 7.32465 9.5118 5.90482M14.6535 5.90482L17.7084 5.90479M9.5118 5.90482L2.29175 5.90479M5.3467 14.0965C5.3467 12.6767 6.4977 11.5257 7.91753 11.5257C9.33736 11.5257 10.4884 12.6767 10.4884 14.0965M5.3467 14.0965C5.3467 15.5163 6.4977 16.6673 7.91753 16.6673C9.33736 16.6673 10.4884 15.5163 10.4884 14.0965M5.3467 14.0965L2.29175 14.0965M10.4884 14.0965L17.7084 14.0965" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
      </path>
     </svg>
     General
    </button>
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5114 3.58748C15.6531 4.0132 15.9871 4.34719 16.4128 4.48881L16.8867 4.64663L16.4128 4.80443C15.9871 4.94604 15.6531 5.28003 15.5114 5.70576L15.3536 6.1797L15.1958 5.70576C15.0542 5.28005 14.7202 4.94604 14.2945 4.80443L13.8203 4.64663L14.2945 4.48881C14.7202 4.34719 15.0542 4.0132 15.1958 3.58748L15.3536 3.11328L15.5114 3.58748Z" stroke="currentColor" strokeWidth="1.3">
      </path>
      <path d="M10.1025 6.45703C10.6433 8.08248 11.9185 9.35771 13.5439 9.89843L15.3535 10.501L13.5439 11.1035C11.9185 11.6442 10.6433 12.9194 10.1025 14.5449L9.5 16.3545L8.89746 14.5449C8.35674 12.9195 7.0815 11.6442 5.45605 11.1035L3.64551 10.501L5.45605 9.89843C7.0815 9.35771 8.35674 8.08248 8.89746 6.45703L9.5 4.64648L10.1025 6.45703Z" stroke="currentColor" strokeWidth="1.3">
      </path>
     </svg>
     Credit and Billing
    </button>
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.37481 2.45995C9.76156 2.23666 10.2381 2.23666 10.6248 2.45995L16.2171 5.68867C16.6039 5.91196 16.8421 6.32462 16.8421 6.7712V13.2287C16.8421 13.6752 16.6039 14.0879 16.2171 14.3112L10.6248 17.5399C10.2381 17.7632 9.76156 17.7632 9.37481 17.5399L3.78253 14.3112C3.39578 14.0879 3.15753 13.6752 3.15753 13.2287V6.7712C3.15753 6.32462 3.39578 5.91196 3.78253 5.68867L9.37481 2.45995Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
      </path>
      <path d="M12.5701 9.99992C12.5701 11.4197 11.4191 12.5707 9.99923 12.5707C8.5794 12.5707 7.42836 11.4197 7.42836 9.99992C7.42836 8.58008 8.5794 7.42911 9.99923 7.42911C11.4191 7.42911 12.5701 8.58008 12.5701 9.99992Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
      </path>
     </svg>
     Personalization
    </button>
   </div>
  </div>
  <div>
   <p className="mb-0.5 block px-3 py-1 text-xs text-gray-400 uppercase">
    Features
   </p>
   <div className="space-y-0.5">
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0009 4.50677C10.0009 3.45887 10.8504 2.60937 11.8983 2.60938C12.7735 2.60938 13.5103 3.20194 13.7294 4.00775H13.8917C15.2724 4.00775 16.3917 5.12704 16.3917 6.50775V6.83806C17.1863 7.3768 17.7084 8.28717 17.7084 9.3195C17.7084 10.3518 17.1863 11.2622 16.3917 11.8009V12.8112C16.3917 14.1919 15.2724 15.3111 13.8917 15.3111H13.7957V15.4917C13.7957 16.5396 12.9462 17.3891 11.8983 17.3891C10.8504 17.3891 10.0009 16.5396 10.0009 15.4917M3.60848 12.8122L3.60848 11.8017C2.81389 11.263 2.29175 10.3526 2.29175 9.32028C2.29175 8.28795 2.81389 7.37758 3.60848 6.83884V6.50878C3.60848 5.12807 4.72777 4.00878 6.10848 4.00878H6.27097C6.49026 3.20327 7.22692 2.611 8.1019 2.611C9.1498 2.611 9.9993 3.46049 9.9993 4.50839V15.4933C9.9993 16.5412 9.14981 17.3907 8.1019 17.3907C7.054 17.3907 6.20451 16.5412 6.20451 15.4933V15.3122H6.10848C4.72777 15.3122 3.60848 14.1929 3.60848 12.8122Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
      </path>
     </svg>
     Memory
    </button>
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.37492 6.66732L5.83325 6.66732M14.1666 10.0007H5.83325M11.0416 13.334H5.83325M4.58325 3.33398H15.4166C16.1069 3.33398 16.6666 3.89363 16.6666 4.58398V15.4173C16.6666 16.1077 16.1069 16.6673 15.4166 16.6673H4.58325C3.8929 16.6673 3.33325 16.1077 3.33325 15.4173V4.58398C3.33325 3.89363 3.8929 3.33398 4.58325 3.33398Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
      </path>
     </svg>
     File &amp; Media
    </button>
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66675 2.29102L6.66676 4.37435M2.29175 13.3327H4.37508M6.66675 15.6243L6.66676 17.7077M15.6251 13.3327H17.7084M10.0001 2.29102V4.37435M2.29175 9.99935H4.37508M10.0001 15.6243V17.7077M15.6251 9.99935H17.7084M13.3334 2.29102V4.37435M2.29175 6.66602L4.37508 6.66601M13.3334 15.6243V17.7077M15.6251 6.66602L17.7084 6.66601M5.62511 15.6243H14.3751C15.0655 15.6243 15.6251 15.0647 15.6251 14.3743V5.62435C15.6251 4.93399 15.0655 4.37435 14.3751 4.37435H5.62511C4.93475 4.37435 4.37511 4.93399 4.37511 5.62435V14.3743C4.37511 15.0647 4.93475 15.6243 5.62511 15.6243Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
      </path>
     </svg>
     Model
    </button>
   </div>
  </div>
  <div>
   <p className="mb-0.5 block px-3 py-1 text-xs text-gray-400 uppercase">
    System
   </p>
   <div className="space-y-0.5">
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.29167 2.29175L7.29167 5.40251M11.875 5.40251V2.29175M9.58333 15.0294V17.7084M15.4167 5.40251L3.75 5.40251M14.375 5.40251L4.79167 5.40251L4.79167 10.1942C4.79167 12.8405 6.93697 14.9858 9.58333 14.9858C12.2297 14.9858 14.375 12.8405 14.375 10.1942L14.375 5.40251Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
      </path>
     </svg>
     Connector
    </button>
    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5" type="button">
     <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6666 5.20898C16.6666 6.5897 13.6818 7.70898 9.99992 7.70898C6.31802 7.70898 3.33325 6.5897 3.33325 5.20898M16.6666 5.20898C16.6666 3.82827 13.6818 2.70898 9.99992 2.70898C6.31802 2.70898 3.33325 3.82827 3.33325 5.20898M16.6666 5.20898V8.15495M3.33325 5.20898V13.5472C3.33325 14.6442 5.21747 15.5731 7.8385 15.9085M3.33325 9.37565C3.33325 10.4754 5.22672 11.4092 7.85779 11.7438M10.3547 12.5557V15.154C10.3547 15.6005 10.593 16.0132 10.9797 16.2365L13.2299 17.5356C13.6167 17.7589 14.0932 17.7589 14.4799 17.5356L16.7301 16.2365C17.1169 16.0132 17.3551 15.6005 17.3551 15.154V12.5557C17.3551 12.1091 17.1169 11.6964 16.7301 11.4731L14.4799 10.174C14.0932 9.9507 13.6167 9.9507 13.2299 10.174L10.9797 11.4731C10.593 11.6964 10.3547 12.1091 10.3547 12.5557Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
      </path>
      <path d="M13.8558 13.2539C14.1872 13.2539 14.4554 13.5221 14.4554 13.8535C14.4554 14.1849 14.1872 14.4531 13.8558 14.4531C13.5245 14.4531 13.2562 14.1849 13.2562 13.8535C13.2562 13.5221 13.5245 13.2539 13.8558 13.2539Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
      </path>
     </svg>
     Data Control
    </button>
   </div>
  </div>
 </div>
</aside>

    </>
  );
};
