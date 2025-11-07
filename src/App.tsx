import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Home, Users, PlusCircle, Menu, Hospital, UserPlus, Bed, Stethoscope, Search, ArrowLeft } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialPatients = [
    { id: 'P001', name: 'Amina Traoré', age: 34, gender: 'Féminin', lastVisit: '2025-05-10', birthDate: '1991-03-15', illness: 'Paludisme', lastVisitInfo: 'Traitement antipaludique prescrit, suivi dans 7 jours.', healthStatus: 'En amélioration' },
    { id: 'P002', name: 'Moussa Diallo', age: 45, gender: 'Masculin', lastVisit: '2025-05-12', birthDate: '1980-08-20', illness: 'Hypertension', lastVisitInfo: 'Ajustement de la médication, contrôle de la tension artérielle.', healthStatus: 'Stable' },
    { id: 'P003', name: 'Fatou Ndiaye', age: 28, gender: 'Féminin', lastVisit: '2025-05-09', birthDate: '1997-01-10', illness: 'Diabète de type 1', lastVisitInfo: 'Éducation sur l\'injection d\'insuline.', healthStatus: 'Stable' },
    { id: 'P004', name: 'Oumar Koné', age: 52, gender: 'Masculin', lastVisit: '2025-05-11', birthDate: '1973-11-25', illness: 'Fracture du bras', lastVisitInfo: 'Pose d\'un plâtre, antidouleurs prescrits.', healthStatus: 'En amélioration' },
    { id: 'P005', name: 'Mariam Diop', age: 61, gender: 'Féminin', lastVisit: '2025-05-13', birthDate: '1964-06-30', illness: 'Insuffisance cardiaque', lastVisitInfo: 'Patient référé à un cardiologue.', healthStatus: 'Critique' },
];

const StatCard = ({ title, value, icon, color, animationProps }) => (
    <motion.div {...animationProps} className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${color}`}>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='text-md font-semibold text-gray-500'>{title}</h3>
                <p className='text-4xl font-bold text-gray-800'>{value}</p>
            </div>
            <div className='p-3 bg-gray-100 rounded-full'>
                {icon}
            </div>
        </div>
    </motion.div>
);

const Dashboard = ({ patients, newlyAdmittedCount }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: 'easeOut'
            }
        })
    };

    const stats = [
        { title: 'Total Patients', value: patients.length, icon: <Users size={28} className='text-blue-500' />, color: 'border-blue-500' },
        { title: 'Nouveaux Admis', value: newlyAdmittedCount, icon: <UserPlus size={28} className='text-green-500' />, color: 'border-green-500' },
        { title: 'Lits Disponibles', value: 32, icon: <Bed size={28} className='text-yellow-500' />, color: 'border-yellow-500' },
        { title: 'Médecins Actifs', value: 8, icon: <Stethoscope size={28} className='text-red-500' />, color: 'border-red-500' },
    ];

    return (
        <div className='flex flex-col h-full bg-gray-50'>
            <header className='bg-white shadow-sm p-4 sticky top-0 z-10'>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className='text-2xl font-bold text-gray-800'>Tableau de Bord</motion.h1>
            </header>
            <main className='flex-grow p-6 overflow-y-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                   {stats.map((stat, i) => (
                       <StatCard 
                           key={stat.title}
                           {...stat} 
                           animationProps={{ variants: cardVariants, initial: 'hidden', animate: 'visible', custom: i }}
                       />
                   ))}
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.5 }} className='relative h-96 rounded-2xl overflow-hidden shadow-2xl'>
                    <img src='https://storage.googleapis.com/dala-prod-public-storage/generated-images/0ec69dfa-53cf-41f0-8f99-00dfed45ff5a/afya-hero-od81wzw-1762433075925.webp' alt='Personnel soignant' className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8'>
                        <h2 className='text-4xl font-bold text-white mb-2'>Bienvenue sur 2SMDhospi</h2>
                        <p className='text-lg text-gray-200'>Votre solution de gestion de patients, simplifiée et efficace.</p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

const PatientList = ({ patients, searchTerm, handleSearch, onSelectPatient }) => {
    const filteredPatients = useMemo(() => 
        patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.id.toLowerCase().includes(searchTerm.toLowerCase())
        ), [patients, searchTerm]);

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className='flex flex-col h-full bg-gray-50'>
            <header className='bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10'>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className='text-2xl font-bold text-gray-800'>Gestion des Patients</motion.h1>
                <NavLink to='/add-patient' className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-md hover:shadow-lg'>
                    <PlusCircle size={20} />
                    Ajouter Patient
                </NavLink>
            </header>
            <main className='flex-grow p-6 overflow-y-auto'>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='relative mb-6'>
                    <input 
                        type='text' 
                        placeholder='Rechercher par nom ou ID...'
                        className='w-full p-3 pl-10 border-none rounded-lg bg-white shadow-md focus:ring-2 focus:ring-blue-500 transition-all'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                </motion.div>
                <motion.div variants={listVariants} initial='hidden' animate='visible' className='grid grid-cols-1 gap-4'>
                    <AnimatePresence>
                        {filteredPatients.map(p => (
                            <motion.div 
                                key={p.id} 
                                variants={itemVariants} 
                                layout
                                initial={{ opacity: 0, scale: 0.8 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className='bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex items-center justify-between cursor-pointer'
                                onClick={() => onSelectPatient(p)}
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='bg-blue-100 text-blue-600 font-bold rounded-full h-12 w-12 flex items-center justify-center text-lg'>
                                        {p.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className='font-bold text-gray-800 text-lg'>{p.name}</p>
                                        <p className='text-sm text-gray-500'>ID: {p.id}</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-gray-700'>{p.age} ans, {p.gender}</p>
                                    <p className='text-sm text-gray-500'>Dernière visite: {p.lastVisit}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>
        </div>
    );
};

const AddPatient = ({ addPatient }) => {
    const navigate = useNavigate();

    const calculateAge = (birthDate) => {
        if (!birthDate) return 0;
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const birthDate = formData.get('birthDate');
        const newPatient = {
            id: `P${Date.now().toString().slice(-4)}`,
            name: formData.get('fullName'),
            birthDate: birthDate,
            age: calculateAge(birthDate),
            gender: formData.get('gender'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            lastVisit: new Date().toISOString().split('T')[0],
            illness: formData.get('illness'),
            lastVisitInfo: formData.get('lastVisitInfo'),
            healthStatus: formData.get('healthStatus'),
        };
        addPatient(newPatient);
        toast.success('Patient ajouté avec succès !');
        e.target.reset();
        navigate('/patients');
    };

    const containerVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } }
    };

    const inputClass = 'w-full p-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all';

    return (
        <div className='flex flex-col h-full bg-gray-50'>
            <header className='bg-white shadow-sm p-4'>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className='text-2xl font-bold text-gray-800'>Ajouter un Nouveau Patient</motion.h1>
            </header>
            <main className='flex-grow p-6 overflow-y-auto'>
                <motion.div variants={containerVariants} initial='hidden' animate='visible' className='bg-white p-8 rounded-2xl shadow-xl max-w-4xl w-full mx-auto'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                        <h2 className='col-span-2 text-xl font-semibold text-gray-700 border-b pb-3 mb-2'>Informations Personnelles</h2>
                        <div><label className='block text-sm font-medium text-gray-600 mb-2'>Nom Complet</label><input type='text' name='fullName' required className={inputClass} /></div>
                        <div><label className='block text-sm font-medium text-gray-600 mb-2'>Date de Naissance</label><input type='date' name='birthDate' required className={inputClass} /></div>
                        <div><label className='block text-sm font-medium text-gray-600 mb-2'>Genre</label><select name='gender' required className={inputClass}><option>Masculin</option><option>Féminin</option></select></div>
                        <div><label className='block text-sm font-medium text-gray-600 mb-2'>Numéro de Téléphone</label><input type='tel' name='phone' required className={inputClass} /></div>
                        <div className='col-span-2'><label className='block text-sm font-medium text-gray-600 mb-2'>Adresse</label><input type='text' name='address' required className={inputClass} /></div>
                        
                        <h2 className='col-span-2 text-xl font-semibold text-gray-700 border-b pb-3 mt-6 mb-2'>Informations Médicales</h2>
                        <div className='col-span-2'><label className='block text-sm font-medium text-gray-600 mb-2'>Motif de la consultation (Maladie)</label><textarea name='illness' rows='3' className={inputClass}></textarea></div>
                        <div className='col-span-2'><label className='block text-sm font-medium text-gray-600 mb-2'>Informations sur la dernière visite</label><textarea name='lastVisitInfo' rows='3' className={inputClass}></textarea></div>
                        <div><label className='block text-sm font-medium text-gray-600 mb-2'>État de santé</label><select name='healthStatus' required className={inputClass}><option>Stable</option><option>En amélioration</option><option>Critique</option></select></div>
                        
                        <div className='col-span-2 text-right mt-6'>
                           <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type='button' onClick={() => navigate('/patients')} className='text-gray-600 mr-4 py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors'>Annuler</motion.button>
                           <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type='submit' className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'>Enregistrer le Patient</motion.button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

const PatientDetail = ({ patient, onBack }) => {
    const getStatusChipClass = (status) => {
        switch (status) {
            case 'Stable': return 'bg-blue-100 text-blue-800';
            case 'En amélioration': return 'bg-green-100 text-green-800';
            case 'Critique': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
         <div className='flex flex-col h-full bg-gray-50'>
            <header className='bg-white shadow-sm p-4 flex items-center sticky top-0 z-10'>
                <motion.button onClick={onBack} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='p-2 rounded-full hover:bg-gray-100 mr-4'>
                    <ArrowLeft size={20} className='text-gray-700'/>
                </motion.button>
                <h1 className='text-2xl font-bold text-gray-800'>Détails du Patient</h1>
            </header>
            <main className='flex-grow p-6 overflow-y-auto'>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto'>
                    <div className='flex items-center mb-8 pb-6 border-b border-gray-200'>
                        <div className='bg-blue-600 text-white font-bold rounded-full h-24 w-24 flex items-center justify-center text-5xl mr-6'>
                            {patient.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className='text-4xl font-bold text-gray-900'>{patient.name}</h2>
                            <p className='text-lg text-gray-500'>ID Patient: {patient.id}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                        <h3 className='md:col-span-2 text-xl font-semibold text-gray-800 mb-2'>Informations Personnelles</h3>
                        <p><strong>Âge:</strong> {patient.age} ans</p>
                        <p><strong>Genre:</strong> {patient.gender}</p>
                        <p><strong>Date de naissance:</strong> {patient.birthDate}</p>
                        <p><strong>Téléphone:</strong> {patient.phone || 'N/A'}</p>
                        <p className='md:col-span-2'><strong>Adresse:</strong> {patient.address || 'N/A'}</p>

                        <h3 className='md:col-span-2 text-xl font-semibold text-gray-800 mt-6 mb-2'>Informations Médicales</h3>
                        <div>
                            <h4 className='font-semibold text-gray-700 mb-2'>État de Santé</h4>
                            <p><span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusChipClass(patient.healthStatus)}`}>{patient.healthStatus || 'Non spécifié'}</span></p>
                        </div>
                        <div>
                            <h4 className='font-semibold text-gray-700 mb-2'>Dernière Visite</h4>
                            <p>{patient.lastVisit}</p>
                        </div>
                        <div className='md:col-span-2'>
                            <h4 className='font-semibold text-gray-700 mb-2'>Motif de la consultation</h4>
                            <p className='text-gray-600 p-3 bg-gray-50 rounded-lg'>{patient.illness || 'Non spécifié'}</p>
                        </div>
                         <div className='md:col-span-2'>
                            <h4 className='font-semibold text-gray-700 mb-2'>Informations sur la dernière visite</h4>
                            <p className='text-gray-600 p-3 bg-gray-50 rounded-lg'>{patient.lastVisitInfo || 'Aucune information supplémentaire.'}</p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

const AppLayout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavItem = ({ to, icon: Icon, children }) => (
        <NavLink
            to={to}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-3 text-lg font-medium transition-colors duration-200 rounded-lg mx-2 ${isActive ? 'bg-blue-700 text-white shadow-inner' : 'text-gray-300 hover:bg-blue-500 hover:text-white'}`
            }
            onClick={() => setIsMenuOpen(false)}
        >
            <Icon className='mr-4' size={24} />
            <span>{children}</span>
        </NavLink>
    );

    return (
        <div className='flex h-screen bg-gray-100 font-sans'>
            <Toaster position='top-right' richColors />
            <aside className={'hidden md:flex flex-col w-72 bg-blue-600 text-white'}>
                <div className='flex items-center justify-center h-20 border-b border-blue-700'>
                    <Hospital size={32} className='mr-3'/>
                    <h1 className='text-2xl font-bold tracking-wider'>2SMDhospi</h1>
                </div>
                <nav className='flex-grow mt-5 space-y-2'>
                    <NavItem to='/' icon={Home}>Tableau de Bord</NavItem>
                    <NavItem to='/patients' icon={Users}>Patients</NavItem>
                    <NavItem to='/add-patient' icon={PlusCircle}>Ajouter Patient</NavItem>
                </nav>
                <div className='p-4 border-t border-blue-700'>
                    <p className='text-sm text-center text-blue-200'>© 2025 2SMDhospi</p>
                </div>
            </aside>

            <div className='md:hidden fixed top-4 left-4 z-30'>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2 bg-blue-600 text-white rounded-md shadow-lg'>
                    <Menu size={24} />
                </button>
            </div>

            <AnimatePresence>
            {isMenuOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden`}
                        onClick={() => setIsMenuOpen(false)} />
                    <motion.aside 
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`fixed top-0 left-0 h-full w-72 bg-blue-600 text-white z-30 md:hidden flex flex-col`}>
                        <div className='flex items-center justify-center h-20 border-b border-blue-700'>
                           <Hospital size={32} className='mr-3'/>
                           <h1 className='text-2xl font-bold tracking-wider'>2SMDhospi</h1>
                       </div>
                       <nav className='flex-grow mt-5 space-y-2'>
                            <NavItem to='/' icon={Home}>Tableau de Bord</NavItem>
                            <NavItem to='/patients' icon={Users}>Patients</NavItem>
                            <NavItem to='/add-patient' icon={PlusCircle}>Ajouter Patient</NavItem>
                       </nav>
                    </motion.aside>
                </>
            )}
            </AnimatePresence>

            <main className='flex-1 flex flex-col overflow-hidden'>
              {children}
            </main>
        </div>
    );
};

export default function App() {
    const [patients, setPatients] = useState(initialPatients);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [newlyAdmittedCount, setNewlyAdmittedCount] = useState(5); 

    const addPatient = (patient) => {
        setPatients(prevPatients => [patient, ...prevPatients]);
        setNewlyAdmittedCount(prevCount => prevCount + 1);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const handleBackToList = () => {
        setSelectedPatient(null);
    };
    
    return (
        <AppLayout>
            <AnimatePresence mode='wait'>
                {selectedPatient ? (
                    <motion.div key='detail' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <PatientDetail patient={selectedPatient} onBack={handleBackToList} />
                    </motion.div>
                ) : (
                    <motion.div key='routes' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Routes>
                            <Route path='/' element={<Dashboard patients={patients} newlyAdmittedCount={newlyAdmittedCount} />} />
                            <Route 
                                path='/patients'
                                element={<PatientList patients={patients} searchTerm={searchTerm} handleSearch={handleSearch} onSelectPatient={handleSelectPatient} />} 
                            />
                            <Route path='/add-patient' element={<AddPatient addPatient={addPatient} />} />
                        </Routes>
                    </motion.div>
                )}
            </AnimatePresence>
        </AppLayout>
    );
}
