import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Rutina from '../rutina/rutina'; // Asumiendo que este componente existe

const API_URL = import.meta.env.VITE_API_URL;

// Componente para una tarjeta de estadística
const StatCard = ({ title, value, unit, color, icon }) => {
  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-xl border border-gray-700`}
      style={{ backgroundColor: color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {icon && (
          <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <img src={icon} alt="" className="w-6 h-6" />
          </div>
        )}
      </div>
      <div className="text-4xl font-extrabold text-white">{value}</div>
      <p className="text-sm font-medium text-white opacity-80 mt-1">{unit}</p>
    </motion.div>
  );
};

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12
    }
  }
};

const titleVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 10,
      duration: 0.8
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98
  }
};

// Componente de Animación de Carga (Esqueleto)
const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse flex">
      {/* Skeleton Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <div className="h-8 bg-gray-700 rounded-lg w-4/5 mb-8"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
      {/* Skeleton Main Content */}
      <div className="flex-1 p-8">
        <div className="h-10 bg-gray-700 rounded-lg w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-700 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-12 bg-gray-700 rounded-lg mb-8 w-1/3"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const getCurrentMonthName = () => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return meses[new Date().getMonth()];
  };

  const [isLoading, setIsLoading] = useState(true);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [todosMisProductos, setTodosMisProductos] = useState([]);
  const [seccionActiva, setSeccionActiva] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [preciosActividades, setPreciosActividades] = useState({
    unaActividad: 0,
    paseLibre: 0,
    estudiante3dias: 0
  });
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarErrorPrecios, setMostrarErrorPrecios] = useState(false);

  const opcionesActividad = [
    "1 actividad",
    "pase libre",
    "Estudiante"
  ];

  const statColors = {
    users: '#10B981',
    income: '#F59E0B',
    newMembers: '#EF4444',
    classes: '#3B82F6'
  };

  const calculateStats = (users) => {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const currentMonth = getCurrentMonthName();
    let totalIncome = 0;
    
    const activeUsers = users.filter(user => user.meses.includes(currentMonth));

    activeUsers.forEach(user => {
      switch (user.actividad) {
        case '1 actividad':
          totalIncome += preciosActividades.unaActividad;
          break;
        case 'pase libre':
          totalIncome += preciosActividades.paseLibre;
          break;
        case 'Estudiante':
          totalIncome += preciosActividades.estudiante3dias;
          break;
        default:
          break;
      }
    });

    const newMembers = users.filter(user => new Date(user.fechaCreacion) >= oneWeekAgo);

    return {
      activeUsers: activeUsers.length,
      totalIncome: totalIncome.toFixed(2),
      newMembers: newMembers.length,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const usersResponse = await axios.get(`${API_URL}/getAllUsers`);
        const usuarios = usersResponse.data;
        const pricesResponse = await axios.get(`${API_URL}/api/activity-prices/prices`);
        
        setTodosMisProductos(usuarios.map(usuario => ({
          id: usuario.id,
          nombre: usuario.name,
          numero: usuario.number,
          email: usuario.email,
          role: usuario.role,
          meses: usuario.meses || [],
          actividad: usuario.actividad,
          rutina: usuario.rutina || null,
          fechaCreacion: new Date(usuario.createdAt).toLocaleDateString(),
          fechaActualizacion: new Date(usuario.updatedAt).toLocaleDateString()
        })));
        
        if (pricesResponse.data) {
          setPreciosActividades({
            unaActividad: pricesResponse.data.unaActividad,
            paseLibre: pricesResponse.data.paseLibre,
            estudiante3dias: pricesResponse.data.estudiante3dias
          });
        }
      } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = (users) => {
    return users.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.actividad.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleEliminarProducto = async (userId) => {
    try {
      await axios.delete(`${API_URL}/deleteUser/${userId}`);
      setTodosMisProductos(todosMisProductos.filter((usuario) => usuario.id !== userId));
      setMensajeExito('Usuario eliminado correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setMensajeError('Error al eliminar el usuario.');
      setTimeout(() => setMensajeError(''), 3000);
    }
  };

  const handleEditarActividad = async (userId, nuevaActividad) => {
    try {
      await axios.put(`${API_URL}/updateActivity/${userId}`, {
        actividad: nuevaActividad
      });

      setTodosMisProductos(todosMisProductos.map(usuario =>
        usuario.id === userId ? { ...usuario, actividad: nuevaActividad } : usuario
      ));

      setProductoAEditar(null);
      setMensajeExito('Actividad actualizada correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al editar la actividad:', error);
      setMensajeError('Error al actualizar la actividad.');
      setTimeout(() => setMensajeError(''), 3000);
    }
  };

  const marcarMesPagado = async (userId) => {
    try {
      const mesActual = getCurrentMonthName();
      await axios.post(`${API_URL}/addMount`, {
        userId,
        month: mesActual
      });

      setTodosMisProductos(todosMisProductos.map(usuario => {
        if (usuario.id === userId) {
          const updatedMeses = usuario.meses.includes(mesActual) ? usuario.meses : [...usuario.meses, mesActual];
          return {
            ...usuario,
            meses: updatedMeses
          };
        }
        return usuario;
      }));

      setMensajeExito('Mes marcado como pagado correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al marcar el mes como pagado:', error);
      setMensajeError('Error al marcar el mes como pagado. Puede que ya esté marcado.');
      setTimeout(() => setMensajeError(''), 3000);
    }
  };

  const handleChangePrecio = (e) => {
    const { name, value } = e.target;
    setPreciosActividades(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const guardarPreciosActividades = async () => {
    try {
      const body = {
        unaActividad: parseFloat(preciosActividades.unaActividad),
        paseLibre: parseFloat(preciosActividades.paseLibre),
        estudiante3dias: parseFloat(preciosActividades.estudiante3dias)
      };

      await axios.post(`${API_URL}/api/activity-prices/update-prices`, body);
      setMensajeExito('Precios actualizados correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al guardar precios:', error);
      setMensajeError('Error al actualizar precios.');
      setTimeout(() => setMensajeError(''), 3000);
    }
  };

  const EditarActividad = ({ producto, onGuardarCambios }) => {
    const [actividad, setActividad] = useState(producto.actividad);

    const handleGuardarCambios = () => {
      onGuardarCambios(producto.id, actividad);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-purple-600"
        >
          <h3 className="text-2xl font-bold mb-6 text-white text-center">Editar Actividad</h3>
          <div className="space-y-5">
            <div>
              <label htmlFor="activity-select" className="block text-sm font-medium text-gray-300 mb-2">Actividad</label>
              <select
                id="activity-select"
                value={actividad}
                onChange={(e) => setActividad(e.target.value)}
                className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-purple-500 focus:border-purple-500 appearance-none transition duration-200"
              >
                {opcionesActividad.map((opcion, index) => (
                  <option key={index} value={opcion} className="bg-gray-700 text-white">
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleGuardarCambios}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-xl shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Guardar Cambios
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setProductoAEditar(null)}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-xl shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancelar
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  };

  const stats = todosMisProductos.length > 0 && Object.keys(preciosActividades).length > 0 ? calculateStats(todosMisProductos) : null;
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 font-sans">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 p-6 shadow-md border-r border-gray-700">
            <div className="flex items-center mb-8">
              <span className="text-2xl font-black text-gray-100">Gym<span className="text-purple-600">Admin</span></span>
            </div>
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <ul>
                {['dashboard', 'Usuarios', 'Abonados', 'No Abonados', 'Precios Actividades'].map((section, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="mb-2"
                  >
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out
                        ${seccionActiva === section
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      onClick={() => {
                        setSeccionActiva(section);
                        setSearchTerm('');
                      }}
                    >
                      {section === 'dashboard' ? 'Panel de Control' : section}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 relative z-10">
            <motion.div 
              className="max-w-7xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                variants={titleVariants}
                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-300 mb-8 drop-shadow-lg uppercase tracking-wide"
              >
                Panel de Control
              </motion.h1>

              {/* Sección de Notificaciones */}
              {mensajeExito && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-xl shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{mensajeExito}</span>
                  </div>
                  <button onClick={() => setMensajeExito('')} className="text-white hover:text-gray-200 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </motion.div>
              )}
              {mensajeError && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-xl shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{mensajeError}</span>
                  </div>
                  <button onClick={() => setMensajeError('')} className="text-white hover:text-gray-200 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </motion.div>
              )}

              {/* Contenido principal según la sección activa */}
              {seccionActiva === 'dashboard' && stats && (
                <motion.section 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                  variants={containerVariants}
                >
                  <StatCard 
                    title="Usuarios Activos"
                    value={stats.activeUsers}
                    unit={`en ${getCurrentMonthName()}`}
                    color={statColors.users}
                  />
                  <StatCard
                    title="Ingresos Totales"
                    value={`$${stats.totalIncome}`}
                    unit={`en ${getCurrentMonthName()}`}
                    color={statColors.income}
                  />
                  <StatCard
                    title="Nuevos Miembros"
                    value={stats.newMembers}
                    unit="esta semana"
                    color={statColors.newMembers}
                  />
                  <StatCard
                    title="Clases Reservadas"
                    value="1.2k" // Valor mock, no hay datos en la API para esto
                    unit="en el último trimestre"
                    color={statColors.classes}
                  />
                </motion.section>
              )}
              
              {/* Secciones de gestión de usuarios y precios */}
              {(seccionActiva === 'Usuarios' || seccionActiva === 'Abonados' || seccionActiva === 'No Abonados') && (
                <motion.section 
                  variants={itemVariants}
                  className="mb-10 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
                >
                  <h2 className="text-3xl font-semibold text-purple-300 mb-6 text-center">
                    {seccionActiva === 'Usuarios' && 'Gestión de Usuarios'}
                    {seccionActiva === 'Abonados' && `Usuarios Abonados (Mes Actual: ${getCurrentMonthName()})`}
                    {seccionActiva === 'No Abonados' && `Usuarios No Abonados (Mes Actual: ${getCurrentMonthName()})`}
                  </h2>
                  <div className="mb-6 relative">
                    <input
                      type="text"
                      placeholder="Buscar por nombre o actividad..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 pl-12 bg-gray-700 text-white border border-gray-600 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                    />
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <ul className="space-y-4">
                    {filteredUsers(todosMisProductos.filter(usuario => {
                      const ultimoMesPagado = usuario.meses.length > 0 ? usuario.meses[usuario.meses.length - 1] : null;
                      if (seccionActiva === 'Abonados') {
                        return ultimoMesPagado === getCurrentMonthName();
                      } else if (seccionActiva === 'No Abonados') {
                        return ultimoMesPagado !== getCurrentMonthName();
                      }
                      return true;
                    })).map((usuario) => (
                      <motion.li 
                        key={usuario.id} 
                        variants={itemVariants}
                        className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 md:space-x-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                      >
                        <div className="flex flex-col flex-grow">
                          <span className="font-bold text-xl text-white">{usuario.nombre}</span>
                          <span className="text-gray-400 text-sm">Email: {usuario.email}</span>
                          <span className="text-gray-400 text-sm">Teléfono: {usuario.numero}</span>
                          <span className="text-purple-300 text-md mt-1">Actividad: <span className="font-semibold">{usuario.actividad}</span></span>
                          <span className="text-gray-500 text-xs italic">Último mes pagado: {usuario.meses.length > 0 ? usuario.meses[usuario.meses.length - 1] : 'No registrado'}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end">
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setProductoAEditar(usuario)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-lg shadow-sm transition duration-200 text-sm"
                          >
                            Editar Actividad
                          </motion.button>
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => marcarMesPagado(usuario.id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg shadow-sm transition duration-200 text-sm"
                          >
                            Marcar Mes Pagado
                          </motion.button>
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleEliminarProducto(usuario.id)}
                            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-medium rounded-lg shadow-sm transition duration-200 text-sm"
                          >
                            Eliminar
                          </motion.button>
                        </div>
                      </motion.li>
                    ))}
                    {filteredUsers(todosMisProductos.filter(usuario => {
                      const ultimoMesPagado = usuario.meses.length > 0 ? usuario.meses[usuario.meses.length - 1] : null;
                      if (seccionActiva === 'Abonados') {
                        return ultimoMesPagado === getCurrentMonthName();
                      } else if (seccionActiva === 'No Abonados') {
                        return ultimoMesPagado !== getCurrentMonthName();
                      }
                      return true;
                    })).length === 0 && (
                        <li className="text-center text-gray-500 py-6">No hay usuarios que coincidan con la búsqueda o el filtro.</li>
                      )}
                  </ul>
                  {productoAEditar && <EditarActividad producto={productoAEditar} onGuardarCambios={handleEditarActividad} />}
                </motion.section>
              )}

              {seccionActiva === 'Precios Actividades' && (
                <motion.section 
                  variants={itemVariants}
                  className="mb-10 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
                >
                  <h2 className="text-3xl font-semibold text-purple-300 mb-6 text-center">Gestión de Precios de Actividades</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label htmlFor="unaActividad" className="block text-md font-medium text-gray-300 mb-2">Precio - Una Actividad</label>
                      <input
                        type="number"
                        id="unaActividad"
                        name="unaActividad"
                        value={preciosActividades.unaActividad}
                        onChange={handleChangePrecio}
                        className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        step="0.01"
                        placeholder="Ej: 30.00"
                      />
                    </div>
                    <div>
                      <label htmlFor="paseLibre" className="block text-md font-medium text-gray-300 mb-2">Precio - Pase Libre</label>
                      <input
                        type="number"
                        id="paseLibre"
                        name="paseLibre"
                        value={preciosActividades.paseLibre}
                        onChange={handleChangePrecio}
                        className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        step="0.01"
                        placeholder="Ej: 50.00"
                      />
                    </div>
                    <div>
                      <label htmlFor="estudiante3dias" className="block text-md font-medium text-gray-300 mb-2">Precio - Estudiante</label>
                      <input
                        type="number"
                        id="estudiante3dias"
                        name="estudiante3dias"
                        value={preciosActividades.estudiante3dias}
                        onChange={handleChangePrecio}
                        className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                        step="0.01"
                        placeholder="Ej: 25.00"
                      />
                    </div>
                  </div>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={guardarPreciosActividades}
                    className="mt-6 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-xl shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Guardar Precios
                  </motion.button>
                </motion.section>
              )}
            </motion.div>
          </main>
        </>
      )}
    </div>
  );
};

export default Admin;