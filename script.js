// CONFIGURATION AVEC NOUVEAUX NOMS ET DESCRIPTIONS
const rankConfig = {
    GOATS: { 
        label: "GOATS: Greatest Players of the 2024 - 2026 Era.", 
        color: "#ffffff", bg: "linear-gradient(135deg, #000000, #aaa)", 
        desc: "This player is among the greatest of the 2024 to 2026 era.", 
        type: "god", btnColor: "#ffffff" 
    },
    SSS: { 
        label: "SSS: Finest Talent Of Our Time.", 
        color: "#fff", bg: "#111", 
        desc: "This player is an icon of one of the strongest eras: 2024 to 2026", 
        type: "god", btnColor: "#ff0055" 
    },
    SS: { 
        label: "SS: Premier Star Of This Generation.", 
        color: "#fff", bg: "#600", 
        desc: "This player is a fiend, and can easily destroy all ranks below him", 
        type: "god", btnColor: "#ffcc00" 
    },
    Splus: { 
        label: "S+ Unmatched Player Of This Age.", 
        color: "#fff", bg: "#d35400", 
        desc: "This player is one of the smartest in combat intelligence, and can win against most below him.", 
        type: "normal", btnColor: "#00f3ff" 
    },
    S: { 
        label: "S: Elite Competitor Of Our Era.", 
        color: "#fff", bg: "#e67e22", 
        desc: "This player is one of the smartest in combat intelligence, and can win against most below him.", 
        type: "normal", btnColor: "#00ff44" 
    },
    A: { 
        label: "A: Worthy Opponent.", 
        color: "#fff", bg: "#8e44ad", 
        desc: "A very strong contender in the arena.", 
        type: "normal", btnColor: "#a35ddf" 
    },
    B: { 
        label: "B: Pinnacle Performer of this rank.", 
        color: "#fff", bg: "#2980b9", 
        desc: "B solid performer with great moments.", 
        type: "normal", btnColor: "#3498db" 
    },
    C: { 
        label: "C Players who are still yet to achieve their prime.", 
        color: "#fff", bg: "#27ae60", 
        desc: "Rising talent, watching for the future.", 
        type: "normal", btnColor: "#7f8c8d" 
    }
};

function App() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [tierData, setTierData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [activeFilter, setActiveFilter] = React.useState("ALL");
    const [tooltip, setTooltip] = React.useState({ show: false, text: "", x: 0, y: 0 });

    React.useEffect(() => {
        fetch('players.json')
            .then(response => response.ok ? response.json() : Promise.reject("Erreur chargement"))
            .then(data => { setTierData(data); setLoading(false); })
            .catch(error => { console.error(error); setLoading(false); });
    }, []);

    const handleMouseMove = (e, desc) => {
        setTooltip({
            show: true,
            text: desc,
            x: e.clientX + 20,
            y: e.clientY + 20
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, show: false });
    };

    if (loading) return <div className="text-white text-center mt-5">Chargement...</div>;
    if (!tierData) return <div className="text-white text-center mt-5 text-danger">Erreur JSON.</div>;

    return (
        <div className="container-fluid p-0">
            <div className="bg-fixed"><div className="bg-grid"></div></div>

            {tooltip.show && (
                <div className="custom-tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
                    {tooltip.text}
                </div>
            )}

            {/* HERO */}
            <header className="hero-section container">
                
                {/* NOUVEAU : Bloc de Profil et Description */}
                <div className="profile-header">
                    <div className="profile-content">
                        <div className="profile-image-container">
                            <img 
                                src="image/En1LT8kUwAA6CxF.jpg" // Remplace par le lien de ton image
                                alt="Profile" 
                                className="profile-img"
                            />
                            <p>SHAYRAIM</p>
                        </div>
                        <div className="profile-image-container">
                            <img 
                                src="image/IMG_2497.jpeg" // Remplace par le lien de ton image
                                alt="Profile" 
                                className="profile-img"
                            />
                            <p>NYX</p>
                        </div>
                        <h1 className="profile-title">YBA Tier List</h1>
                        <div className="disclaimer-box">
                            <p style={{margin: 0}}>
                                <strong>Disclaimer:</strong> Tierlist placements are <strong>NOT final and are subject to change</strong> Tierlist updates are weekly. Players are viable to change in position / rank. They will only increase/decrease if they continue playing. But if they stop playing, then they cannot move down on the tierlist. They may only rise depending on how those still playing, play."
                            </p>
                        </div>
                    </div>
                </div>

                <h1 className="hero-title"><br/>TIERLIST</h1>
                <div className="hero-subtitle">ERA 2024 - 2026 • UPDATED WEEKLY</div>
                
                <div className="controls-area">
                    <div className="search-wrapper">
                        <input 
                            type="text" 
                            className="custom-search" 
                            placeholder="Rechercher un joueur..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                        />
                    </div>
                    <div className="filter-container">
                        <button 
                            className={`filter-btn ${activeFilter === "ALL" ? "active-all" : ""}`}
                            onClick={() => setActiveFilter("ALL")}
                        >
                            ALL
                        </button>
                        
                        {Object.entries(rankConfig).map(([rankKey, config]) => (
                            <button
                                key={rankKey}
                                className={`filter-btn ${activeFilter === rankKey ? "active" : ""}`}
                                onClick={() => setActiveFilter(rankKey)}
                                style={{ color: activeFilter === rankKey ? config.btnColor : undefined }}
                            >
                                <span style={{color: config.btnColor, fontSize:'1.2em'}}>•</span> {rankKey}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* LISTE */}
            <div className="container pb-5">
                {Object.entries(rankConfig).map(([rankKey, config], index) => {
                    if (activeFilter !== "ALL" && activeFilter !== rankKey) return null;

                    const players = tierData[rankKey] || [];
                    const filtered = players.filter(p => p.toLowerCase().includes(searchTerm));

                    if (filtered.length === 0 && searchTerm !== "") return null;

                    return (
                        <div className="tier-row" key={rankKey} style={{animationDelay: index * 0.1 + 's'}}>
                            <div 
                                className="tier-label" 
                                style={{ background: config.bg, color: config.color, borderRight: `3px solid ${config.color === '#000' ? '#fff' : config.color}` }}
                            >
                                {config.label}
                            </div>
                            <div className="tier-content">
                                {filtered.map((player, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`player-card ${config.type === 'god' ? 'god-tier' : 'normal-tier'}`}
                                        onMouseMove={(e) => handleMouseMove(e, config.desc)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {player}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* FOOTER */}
            <footer className="text-center text-secondary">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h4 className="text-white mb-4" style={{fontFamily: 'Orbitron'}}>LEGENDS PROJECT</h4>
                            <div className="credit-box mb-4">
                                <div className="fs-5">Tierlist & Content by <strong style={{color: '#ff0055'}}>NYX</strong></div>
                                <hr style={{borderColor: '#444'}}/>
                                <div className="fs-5">Website by <strong style={{color: '#00f3ff'}}>SHAYRAIM</strong></div>
                            </div>
                            <p className="small mt-3">&copy; 2026. Made with React & Bootstrap.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
