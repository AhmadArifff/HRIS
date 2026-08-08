import React from "react";

export const AccountSettings = () => {
  return (
    <>
<main className="h-full flex-1 overflow-y-auto no-scrollbar">
 <div className="mx-auto py-6 xl:max-w-[650px] xl:py-8.5">
  <h2 className="mb-6 border-b border-gray-200 pb-4 text-2xl font-semibold text-gray-900 dark:border-gray-800 dark:text-white/90">
   Account
  </h2>
  <div className="space-y-6">
   <section className="space-y-4">
    <h3 className="mb-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
     Profile Info
    </h3>
    <div className="rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
     <div className="flex items-center gap-3 border-b border-gray-100 p-4 dark:border-gray-800">
      <div className="bg-brand-400 inline-flex size-15 items-center justify-center rounded-full text-2xl font-medium text-white">
       M
      </div>
      <div>
       <label className="mb-2 inline-flex h-7 cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 shadow-xs dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white/90">
        <input className="hidden" name="avatar" type="file"/>
        Upload Avatar
       </label>
       <p className="text-xs text-gray-500 dark:text-gray-500">
        Min 400x400px, PNG or JPEG formats.
       </p>
      </div>
     </div>
     <div className="flex flex-col justify-between gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
      <label className="flex-1 text-sm font-medium text-gray-700 dark:text-white/90">
       Full Name
      </label>
      <div className="flex-1">
       <input className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" placeholder="Musharof Chowdhory" type="text"/>
      </div>
     </div>
     <div className="flex flex-col justify-between gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
      <label className="flex-1 text-sm font-medium text-gray-700 dark:text-white/90">
       Email
      </label>
      <div className="flex-1">
       <input className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" placeholder="musharof@example.com" type="email"/>
      </div>
     </div>
     <div className="flex flex-col justify-between gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
      <label className="flex-1 text-sm font-medium text-gray-700 dark:text-white/90">
       Workspace Name
      </label>
      <div className="flex-1">
       <input className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" placeholder="Pimjo" type="text"/>
      </div>
     </div>
     <div className="flex justify-end p-4">
      <button className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition" type="button">
       Save Changes
      </button>
     </div>
    </div>
   </section>
   <section className="space-y-4">
    <h3 className="mb-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
     Security
    </h3>
    <div className="rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
     <div className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3">
       <div>
        <div className="flex flex-wrap items-center gap-2">
         <p className="text-sm mb-1 font-medium text-gray-800 dark:text-white/90">
          Change password
         </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
         Last updated 2 months ago
        </p>
       </div>
      </div>
      <div className="shrink-0">
       <button className="inline-flex h-9 cursor-pointer w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-100 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5" type="button">
        Update password
       </button>
      </div>
     </div>
     <div className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3">
       <div>
        <div className="flex flex-wrap items-center gap-2">
         <p className="text-sm mb-1 font-medium text-gray-800 dark:text-white/90">
          Two-Factor Authentication
         </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
         3 devices currently signed in
        </p>
       </div>
      </div>
      <div className="shrink-0">
       <button aria-pressed="false" className="flex cursor-pointer items-center select-none" type="button">
        <span className="relative">
         <span className="block h-5 w-9 rounded-full transition bg-gray-200 dark:bg-white/10">
         </span>
         <span className="shadow-theme-sm absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition duration-200 ease-linear translate-x-0">
         </span>
        </span>
       </button>
      </div>
     </div>
     <div className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
       <div>
        <div className="flex flex-wrap items-center gap-2">
         <p className="text-sm mb-1 font-medium text-gray-800 dark:text-white/90">
          Active sessions
         </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
         3 devices currently signed in
        </p>
       </div>
      </div>
      <div className="shrink-0">
       <button className="inline-flex h-9 cursor-pointer w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-100 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5" type="button">
        Manage
       </button>
      </div>
     </div>
    </div>
   </section>
   <section className="space-y-4">
    <h3 className="mb-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
     Danger Zone
    </h3>
    <div className="rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
     <div className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3">
       <div>
        <div className="flex flex-wrap items-center gap-2">
         <p className="text-sm mb-1 font-medium text-gray-800 dark:text-white/90">
          Logout all devices
         </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
         Sign out from every active session.
        </p>
       </div>
      </div>
      <div className="shrink-0">
       <button className="inline-flex h-9 cursor-pointer w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-100 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5" type="button">
        <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
         <path d="M3.33337 9.99935L9.79171 9.99935M6.66611 6.66602L3.335 9.99924L6.66611 13.3327M8.12504 4.16276V3.54102C8.12504 2.85066 8.68469 2.29102 9.37504 2.29102H14.375C15.0654 2.29102 15.625 2.85066 15.625 3.54102V16.4577C15.625 17.148 15.0654 17.7077 14.375 17.7077H9.37504C8.68468 17.7077 8.12504 17.148 8.12504 16.4577V15.8327" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
         </path>
        </svg>
        Logout All
       </button>
      </div>
     </div>
     <div className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
       <div>
        <div className="flex flex-wrap items-center gap-2">
         <p className="text-sm mb-1 font-medium text-gray-800 dark:text-white/90">
          Delete account
         </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
         Permanently remove this workspace and all saved data.
        </p>
       </div>
      </div>
      <div className="shrink-0">
       <button className="inline-flex h-9 w-full sm:w-auto cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-red-400 px-3.5 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10" type="button">
        <svg className="size-5" fill="none" height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
         <path clipRule="evenodd" d="M6.54142 3.7915C6.54142 2.54886 7.54878 1.5415 8.79142 1.5415H11.2081C12.4507 1.5415 13.4581 2.54886 13.4581 3.7915V4.0415H15.6252H16.666C17.0802 4.0415 17.416 4.37729 17.416 4.7915C17.416 5.20572 17.0802 5.5415 16.666 5.5415H16.3752V8.24638V13.2464V16.2082C16.3752 17.4508 15.3678 18.4582 14.1252 18.4582H5.87516C4.63252 18.4582 3.62516 17.4508 3.62516 16.2082V13.2464V8.24638V5.5415H3.3335C2.91928 5.5415 2.5835 5.20572 2.5835 4.7915C2.5835 4.37729 2.91928 4.0415 3.3335 4.0415H4.37516H6.54142V3.7915ZM14.8752 13.2464V8.24638V5.5415H13.4581H12.7081H7.29142H6.54142H5.12516V8.24638V13.2464V16.2082C5.12516 16.6224 5.46095 16.9582 5.87516 16.9582H14.1252C14.5394 16.9582 14.8752 16.6224 14.8752 16.2082V13.2464ZM8.04142 4.0415H11.9581V3.7915C11.9581 3.37729 11.6223 3.0415 11.2081 3.0415H8.79142C8.37721 3.0415 8.04142 3.37729 8.04142 3.7915V4.0415ZM8.3335 7.99984C8.74771 7.99984 9.0835 8.33562 9.0835 8.74984V13.7498C9.0835 14.1641 8.74771 14.4998 8.3335 14.4998C7.91928 14.4998 7.5835 14.1641 7.5835 13.7498V8.74984C7.5835 8.33562 7.91928 7.99984 8.3335 7.99984ZM12.4168 8.74984C12.4168 8.33562 12.081 7.99984 11.6668 7.99984C11.2526 7.99984 10.9168 8.33562 10.9168 8.74984V13.7498C10.9168 14.1641 11.2526 14.4998 11.6668 14.4998C12.081 14.4998 12.4168 14.1641 12.4168 13.7498V8.74984Z" fill="currentColor" fillRule="evenodd">
         </path>
        </svg>
        Delete
       </button>
      </div>
     </div>
    </div>
   </section>
  </div>
 </div>
</main>

    </>
  );
};
