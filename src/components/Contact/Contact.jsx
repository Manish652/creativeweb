export default function Contact() {
    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-black/50 sm:items-center sm:pt-0 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
            </div>

            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 relative z-10">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Cyberpunk-style Contact Info */}
                        <div className="p-8 border-2 border-blue-400/30 bg-gradient-to-br from-black/40 to-black/20 
                            transform perspective-1000 hover:rotate-y-12 hover:scale-105 transition-all duration-700 hover:shadow-[0_0_40px_rgba(67,56,202,0.4)]">
                            <h1 className="text-4xl font-bold mb-6">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-text-flow">
                                    CONNECT//TRANSMIT
                                </span>
                                <div className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 mt-2 w-full animate-laser-line" />
                            </h1>

                            <div className="space-y-6">
                                {[
                                    {icon: '📍', text: 'Neon District, Cyber City 2077'},
                                    {icon: '📞', text: '+1-900-CYBER-PUNK'},
                                    {icon: '📧', text: 'data@cyber.transmit'}
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center group">
                                        <span className="text-2xl mr-4 text-blue-400 animate-bounce">{item.icon}</span>
                                        <div className="relative overflow-hidden">
                                            <div className="text-lg font-mono text-purple-300 translate-y-0 group-hover:-translate-y-full transition-transform duration-500">
                                                {item.text}
                                            </div>
                                            <div className="absolute top-full text-lg font-mono text-blue-300 group-hover:-translate-y-full transition-transform duration-500">
                                                {item.text.replace(/./g, '░')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Holographic Form */}
                        <form className="p-8 bg-black/40 border-2 border-purple-400/30 
                            transform perspective-1000 hover:-rotate-y-6 hover:scale-105 transition-all duration-700 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                            <div className="space-y-6">
                                {['IDENTITY', 'DATA_NODE', 'FREQUENCY'].map((field, index) => (
                                    <div key={field} className="relative">
                                        <input
                                            type={index === 2 ? 'tel' : index === 1 ? 'email' : 'text'}
                                            placeholder=" "
                                            className="w-full px-4 py-3 bg-black/30 border-2 border-blue-400/40 text-purple-100 
                                                placeholder-transparent focus:border-purple-400 focus:outline-none
                                                transition-all duration-300 peer"
                                        />
                                        <label className="absolute left-3 -top-2 px-1 bg-black/40 text-blue-300 text-sm 
                                            font-mono transition-all duration-300 peer-placeholder-shown:top-3 
                                            peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-300/60 
                                            peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400">
                                            {field.replace('_', ' ')}
                                        </label>
                                        <div className="absolute inset-0 border-2 border-purple-400/20 pointer-events-none 
                                            animate-hologram" />
                                    </div>
                                ))}

                                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                                    hover:from-blue-500 hover:to-purple-500 text-white font-bold 
                                    border-2 border-blue-400/40 relative overflow-hidden
                                    transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                                    <span className="relative z-10">INITIATE TRANSMISSION</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
                                        animate-scan-line" />
                                    <div className="absolute inset-0 border-2 border-purple-400/30 animate-hologram" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Floating glitch elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} 
                        className="absolute w-1 h-1 bg-blue-400/30 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }} />
                ))}
            </div>
        </div>
    );
}