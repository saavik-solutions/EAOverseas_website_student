}

export const ProfileHero: React.FC<Props> = ({ user, onEdit, isLoading }) => {
  if (isLoading) {
    return <div className="w-full h-64 bg-gray-100 animate-pulse rounded-[3rem]" />;
  }

  const getGenderIcon = () => {
    const gender = user?.gender?.toLowerCase();
    if (gender === 'male') return <UserIcon className="w-full h-full text-blue-500" />;
    if (gender === 'female') return <UserIcon className="w-full h-full text-pink-500" />;
    return <UserIcon className="w-full h-full text-brand-primary" />;
  };

  const mainEdu = user?.education?.[0];

  const handleShare = () => {
    const url = `${window.location.origin}/profile/${user._id}`;
    navigator.clipboard.writeText(url);
    alert('Profile link copied to clipboard!');
  };

  return (
    <section className="relative w-full mb-12 pt-8">
       <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 bg-white border border-border rounded-[3rem] p-8 md:p-10 shadow-sm relative overflow-hidden group">
          {/* Decorative background element for "LinkdIn" feel */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] transition-transform group-hover:scale-110" />
          
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8 w-full md:w-auto text-center md:text-left relative z-10">
             {/* Identity Box */}
             <div className="relative group shrink-0">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1.5 bg-bg-base shadow-sm border border-border/50">
                   <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-50 flex items-center justify-center">
                      {user?.avatarUrl ? (
                        <img src={user.avatarUrl} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <div className="w-2/3 h-2/3 opacity-70">
                          {getGenderIcon()}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center cursor-pointer">
                         <Edit3 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all drop-shadow-md" />
                      </div>
                   </div>
                </div>
};
