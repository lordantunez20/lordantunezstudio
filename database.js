// ============================================================
// SUPABASE DATABASE SYSTEM
// ============================================================

const SUPABASE_CONFIG = {
    url: 'https://iawmcyfxlwusbsbmoroh.supabase.co',
    anonKey: 'sb_publishable_5HKuoZLmpHWR3tBZGmbV_w_LMyIyhla'
};

const defaultData = {
    projects: [
        { id: 1, image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80', tag: 'Branding', title: 'Aura Cosmetics', desc: 'Identidad premium para marca de skincare', descLong: 'DiseÃ±amos una identidad de marca premium para Aura Cosmetics, una startup de skincare sostenible. El proyecto incluyÃ³ naming, logotipo, sistema visual completo, packaging eco-friendly y direcciÃ³n de arte para campaÃ±as digitales.', tags: ['Logo Design','Brandbook','Packaging','DirecciÃ³n de Arte'] },
        { id: 2, image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', tag: 'UI/UX', title: 'TechFlow App', desc: 'DiseÃ±o de app de productividad', descLong: 'RediseÃ±o completo de la experiencia de usuario para TechFlow, una app de productividad con mÃ¡s de 2M de usuarios. Simplificamos flujos complejos y creamos un sistema de diseÃ±o escalable.', tags: ['UX Research','UI Design','Design System','Prototipado'] },
        { id: 3, image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80', tag: 'Packaging', title: 'NÃ³mada CafÃ©', desc: 'Packaging artesanal para cafÃ© de especialidad', descLong: 'Creamos el packaging para NÃ³mada CafÃ©, una tostadora artesanal de especialidad. DiseÃ±amos bolsas con vÃ¡lvula de degasificaciÃ³n y etiquetas ilustradas a mano.', tags: ['Packaging','IlustraciÃ³n','Print Design','Mockups'] },
        { id: 4, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', tag: 'Publicidad', title: 'Velocity Motors', desc: 'CampaÃ±a visual para concesionario premium', descLong: 'CampaÃ±a visual integral para el lanzamiento de la nueva gama de vehÃ­culos elÃ©ctricos de Velocity Motors. La campaÃ±a generÃ³ un aumento del 150% en consultas.', tags: ['CampaÃ±a Digital','OOH','Social Media','Print'] },
        { id: 5, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', tag: 'Web Design', title: 'Finova Fintech', desc: 'Sitio web para plataforma financiera', descLong: 'DiseÃ±o y desarrollo del sitio web corporativo para Finova. Creamos una experiencia web inmersiva que incrementÃ³ las solicitudes de demo en un 65%.', tags: ['Web Design','Motion','UX Writing','Analytics'] },
        { id: 6, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', tag: 'Motion', title: 'Lumina Festival', desc: 'Identidad visual y motion para festival de mÃºsica', descLong: 'Identidad visual completa para Lumina, un festival de mÃºsica electrÃ³nica y arte digital. MÃ¡s de 5M de visualizaciones en redes sociales.', tags: ['Motion Graphics','Branding','Social Content','Merch'] }
    ],
    services: [
        { id: 1, icon: 'fas fa-fingerprint', title: 'Branding & Identidad', desc: 'Desarrollamos identidades de marca completas: naming, logotipos, paletas cromÃ¡ticas, tipografÃ­as y sistemas visuales coherentes que perduran en el tiempo.', tags: ['Logo','Brandbook','Naming'], color: 'cyan' },
        { id: 2, icon: 'fas fa-layer-group', title: 'DiseÃ±o UI/UX', desc: 'DiseÃ±amos interfaces digitales intuitivas y atractivas. Wireframes, prototipos interactivos y diseÃ±os de alta fidelidad para web y aplicaciones mÃ³viles.', tags: ['Web','Apps','SaaS'], color: 'magenta' },
        { id: 3, icon: 'fas fa-bullhorn', title: 'DiseÃ±o Publicitario', desc: 'CampaÃ±as visuales de alto impacto: banners, flyers, brochures, vallas publicitarias y material promocional que captura la atenciÃ³n al instante.', tags: ['Print','Digital','OOH'], color: 'yellow' },
        { id: 4, icon: 'fas fa-hashtag', title: 'Redes Sociales', desc: 'Estrategia visual para Instagram, TikTok, LinkedIn y mÃ¡s. Templates, carruseles, reels y contenido que genera engagement y comunidad.', tags: ['Instagram','TikTok','LinkedIn'], color: 'cyan' },
        { id: 5, icon: 'fas fa-play-circle', title: 'Motion Graphics', desc: 'Animaciones 2D/3D, intros, transiciones y microinteracciones que dan vida a tu marca y comunican mensajes complejos de forma sencilla.', tags: ['After Effects','Lottie','3D'], color: 'magenta' },
        { id: 6, icon: 'fas fa-box-open', title: 'Packaging', desc: 'DiseÃ±o de empaques que venden en el punto de venta. Etiquetas, cajas, bolsas y envases que comunican calidad y diferencian tu producto.', tags: ['Etiquetas','Cajas','Mockups'], color: 'yellow' }
    ],
    testimonials: [
        { id: 1, name: 'MarÃ­a GonzÃ¡lez', role: 'CEO, Aura Cosmetics', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: 'LORDANTUNEZ transformÃ³ completamente nuestra imagen de marca. El resultado superÃ³ todas nuestras expectativas. Profesionalismo, creatividad y atenciÃ³n al detalle en cada entrega.' },
        { id: 2, name: 'Carlos Mendoza', role: 'Founder, TechFlow', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', text: 'Trabajar con el equipo de LORDANTUNEZ fue una experiencia excepcional. Entendieron nuestra visiÃ³n desde el primer momento y la elevaron a un nivel que no imaginÃ¡bamos posible.' },
        { id: 3, name: 'Laura Vargas', role: 'CMO, Finova', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: 'El rediseÃ±o de nuestra app aumentÃ³ las conversiones en un 40%. El enfoque en UX fue clave. Sin duda, nuestro socio creativo de confianza para todos los proyectos futuros.' }
    ],
    messages: []
};

const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <rect width="1200" height="800" fill="#111111"/>
        <circle cx="420" cy="320" r="220" fill="#00f0ff" opacity="0.18"/>
        <circle cx="760" cy="430" r="260" fill="#ff00a0" opacity="0.16"/>
        <text x="600" y="420" fill="#f5f5f5" font-family="Arial, sans-serif" font-size="54" text-anchor="middle">LORDANTUNEZ Studio</text>
    </svg>
`);

const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const allowedServiceColors = new Set(['cyan', 'magenta', 'yellow']);
const stores = ['projects', 'services', 'testimonials', 'messages'];

let cloudDb = null;
let ready = false;
let dbMode = 'demo';
let memoryData = cloneDefaultData();

function cloneDefaultData() {
    return JSON.parse(JSON.stringify(defaultData));
}

function textValue(value, fallback = '') {
    const text = String(value ?? '').trim();
    return text || fallback;
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => escapeMap[char]);
}

function safeUrl(value, fallback = FALLBACK_IMAGE) {
    const raw = textValue(value);
    if (!raw) return fallback;
    try {
        const url = new URL(raw, window.location.href);
        if (url.protocol === 'data:') {
            return raw.toLowerCase().startsWith('data:image/') ? raw : fallback;
        }
        return ['http:', 'https:'].includes(url.protocol) ? url.href : fallback;
    } catch {
        return fallback;
    }
}

function normalizeTags(value) {
    const tags = Array.isArray(value) ? value : String(value ?? '').split(',');
    return tags.map(tag => textValue(tag)).filter(Boolean).slice(0, 8);
}

function safeIconClass(value) {
    const cleaned = textValue(value, 'fas fa-star')
        .split(/\s+/)
        .map(token => token.replace(/[^\w-]/g, ''))
        .filter(Boolean)
        .slice(0, 4)
        .join(' ');
    return cleaned || 'fas fa-star';
}

function normalizeId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function normalizeProject(project = {}) {
    const normalized = {
        image: safeUrl(project.image),
        tag: textValue(project.tag, 'Branding'),
        title: textValue(project.title, 'Proyecto sin tÃ­tulo'),
        desc: textValue(project.desc ?? project.desc_short, 'Proyecto destacado de LORDANTUNEZ Studio'),
        descLong: textValue(project.descLong ?? project.desc_long, project.desc || project.desc_short || 'Proyecto destacado de LORDANTUNEZ Studio'),
        tags: normalizeTags(project.tags)
    };
    const id = normalizeId(project.id);
    if (id) normalized.id = id;
    return normalized;
}

function normalizeService(service = {}) {
    const color = textValue(service.color, 'cyan').toLowerCase();
    const normalized = {
        icon: safeIconClass(service.icon),
        title: textValue(service.title, 'Servicio creativo'),
        desc: textValue(service.desc ?? service.description, 'SoluciÃ³n visual diseÃ±ada para elevar tu marca.'),
        tags: normalizeTags(service.tags),
        color: allowedServiceColors.has(color) ? color : 'cyan'
    };
    const id = normalizeId(service.id);
    if (id) normalized.id = id;
    return normalized;
}

function normalizeTestimonial(testimonial = {}) {
    const normalized = {
        name: textValue(testimonial.name, 'Cliente'),
        role: textValue(testimonial.role, 'Cliente verificado'),
        photo: safeUrl(testimonial.photo),
        text: textValue(testimonial.text, 'Una experiencia profesional, clara y muy cuidada.')
    };
    const id = normalizeId(testimonial.id);
    if (id) normalized.id = id;
    return normalized;
}

function normalizeMessage(message = {}) {
    const normalized = {
        name: textValue(message.name, 'Sin nombre'),
        email: textValue(message.email, 'Sin email'),
        message: textValue(message.message, 'Sin mensaje'),
        date: textValue(message.date ?? message.sent_at, new Date().toISOString())
    };
    const id = normalizeId(message.id);
    if (id) normalized.id = id;
    return normalized;
}

function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Fecha no disponible' : date.toLocaleString('es-HN');
}

const normalizers = {
    projects: normalizeProject,
    services: normalizeService,
    testimonials: normalizeTestimonial,
    messages: normalizeMessage
};

const tableAdapters = {
    projects: {
        toRow(project, includeId = false) {
            const item = normalizeProject(project);
            return removeEmptyId({
                id: includeId ? item.id : undefined,
                image: item.image,
                tag: item.tag,
                title: item.title,
                desc_short: item.desc,
                desc_long: item.descLong,
                tags: item.tags
            });
        },
        fromRow(row) {
            return normalizeProject({
                id: row.id,
                image: row.image,
                tag: row.tag,
                title: row.title,
                desc: row.desc_short,
                descLong: row.desc_long,
                tags: row.tags
            });
        }
    },
    services: {
        toRow(service, includeId = false) {
            const item = normalizeService(service);
            return removeEmptyId({
                id: includeId ? item.id : undefined,
                icon: item.icon,
                title: item.title,
                description: item.desc,
                tags: item.tags,
                color: item.color
            });
        },
        fromRow(row) {
            return normalizeService({
                id: row.id,
                icon: row.icon,
                title: row.title,
                desc: row.description,
                tags: row.tags,
                color: row.color
            });
        }
    },
    testimonials: {
        toRow(testimonial, includeId = false) {
            const item = normalizeTestimonial(testimonial);
            return removeEmptyId({
                id: includeId ? item.id : undefined,
                name: item.name,
                role: item.role,
                photo: item.photo,
                text: item.text
            });
        },
        fromRow(row) {
            return normalizeTestimonial(row);
        }
    },
    messages: {
        toRow(message, includeId = false) {
            const item = normalizeMessage(message);
            return removeEmptyId({
                id: includeId ? item.id : undefined,
                name: item.name,
                email: item.email,
                message: item.message,
                sent_at: item.date
            });
        },
        fromRow(row) {
            return normalizeMessage({
                id: row.id,
                name: row.name,
                email: row.email,
                message: row.message,
                date: row.sent_at
            });
        }
    }
};

function removeEmptyId(record) {
    if (!normalizeId(record.id)) delete record.id;
    return record;
}

function assertStore(storeName) {
    if (!stores.includes(storeName)) {
        throw new Error(`Tabla no permitida: ${storeName}`);
    }
}

function isSupabaseConfigured() {
    return SUPABASE_CONFIG.url.startsWith('https://')
        && SUPABASE_CONFIG.url.includes('.supabase.co')
        && SUPABASE_CONFIG.anonKey.length > 40
        && !SUPABASE_CONFIG.url.includes('PEGA_AQUI')
        && !SUPABASE_CONFIG.anonKey.includes('PEGA_AQUI');
}

async function initDB() {
    if (ready) return cloudDb;

    if (!isSupabaseConfigured()) {
        console.warn('Supabase no estÃ¡ configurado. El sitio usarÃ¡ datos de demostraciÃ³n en memoria.');
        dbMode = 'demo';
        ready = true;
        return null;
    }

    if (!window.supabase?.createClient) {
        console.warn('Supabase no se cargÃ³ desde el CDN. El sitio usarÃ¡ datos de demostraciÃ³n en memoria.');
        dbMode = 'demo';
        ready = true;
        return null;
    }

    const { createClient } = window.supabase;
    cloudDb = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false
        }
    });

    const { error } = await cloudDb.from('projects').select('id', { count: 'exact', head: true });
    if (error) {
        console.warn('No se pudo conectar con Supabase. El sitio usarÃ¡ datos de demostraciÃ³n en memoria.', error);
        cloudDb = null;
        dbMode = 'demo';
    } else {
        dbMode = 'supabase';
    }

    ready = true;
    return cloudDb;
}

async function ensureReady() {
    if (!ready) await initDB();
}

async function populateDefaultsIfEmpty() {
    await ensureReady();
    if (dbMode !== 'supabase') return;

    for (const storeName of ['projects', 'services', 'testimonials']) {
        const count = await countStore(storeName);
        if (count === 0) {
            for (const item of defaultData[storeName]) {
                try {
                    await addToStore(storeName, item);
                } catch (error) {
                    console.warn(`No se pudieron sembrar datos iniciales en ${storeName}. Inicia sesiÃ³n como admin o importa un backup.`, error);
                    break;
                }
            }
        }
    }
}

async function countStore(storeName) {
    assertStore(storeName);
    await ensureReady();

    if (dbMode !== 'supabase') {
        return memoryData[storeName].length;
    }

    const { count, error } = await cloudDb
        .from(storeName)
        .select('id', { count: 'exact', head: true });
    if (error) throw error;
    return count || 0;
}

async function getAllFromStore(storeName) {
    assertStore(storeName);
    await ensureReady();

    if (dbMode !== 'supabase') {
        return memoryData[storeName].map(item => normalizers[storeName](item));
    }

    const { data, error } = await cloudDb
        .from(storeName)
        .select('*')
        .order('id', { ascending: true });
    if (error) throw error;
    return (data || []).map(item => tableAdapters[storeName].fromRow(item));
}

async function addToStore(storeName, data) {
    assertStore(storeName);
    await ensureReady();

    if (dbMode !== 'supabase') {
        const nextId = memoryData[storeName].reduce((max, item) => Math.max(max, normalizeId(item.id) || 0), 0) + 1;
        const item = normalizers[storeName]({ ...data, id: nextId });
        memoryData[storeName].push(item);
        return nextId;
    }

    const record = tableAdapters[storeName].toRow(data, false);
    if (storeName === 'messages') {
        const { error } = await cloudDb
            .from(storeName)
            .insert(record);
        if (error) throw error;
        return null;
    }

    const { data: inserted, error } = await cloudDb
        .from(storeName)
        .insert(record)
        .select('id')
        .single();
    if (error) throw error;
    return inserted?.id;
}

async function updateInStore(storeName, data) {
    assertStore(storeName);
    await ensureReady();

    const id = normalizeId(data.id);
    if (!id) throw new Error('No se puede actualizar un registro sin id');

    if (dbMode !== 'supabase') {
        const index = memoryData[storeName].findIndex(item => normalizeId(item.id) === id);
        if (index === -1) return null;
        memoryData[storeName][index] = normalizers[storeName]({ ...data, id });
        return id;
    }

    const record = tableAdapters[storeName].toRow(data, false);
    const { data: updated, error } = await cloudDb
        .from(storeName)
        .update(record)
        .eq('id', id)
        .select('id')
        .single();
    if (error) throw error;
    return updated?.id;
}

async function deleteFromStore(storeName, id) {
    assertStore(storeName);
    await ensureReady();

    const cleanId = normalizeId(id);
    if (!cleanId) return;

    if (dbMode !== 'supabase') {
        memoryData[storeName] = memoryData[storeName].filter(item => normalizeId(item.id) !== cleanId);
        return;
    }

    const { error } = await cloudDb
        .from(storeName)
        .delete()
        .eq('id', cleanId);
    if (error) throw error;
}

async function clearStore(storeName) {
    assertStore(storeName);
    await ensureReady();

    if (dbMode !== 'supabase') {
        memoryData[storeName] = [];
        return;
    }

    const { error } = await cloudDb
        .from(storeName)
        .delete()
        .not('id', 'is', null);
    if (error) throw error;
}

async function signInAdmin(email, password) {
    await ensureReady();
    if (dbMode !== 'supabase') {
        throw new Error('Configura Supabase antes de iniciar sesiÃ³n como administrador.');
    }

    const { data, error } = await cloudDb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

async function signOutAdmin() {
    await ensureReady();
    if (dbMode === 'supabase') {
        await cloudDb.auth.signOut();
    }
}

async function getAdminSession() {
    await ensureReady();
    if (dbMode !== 'supabase') return null;
    const { data } = await cloudDb.auth.getSession();
    return data?.session || null;
}

window.SiteUtils = {
    FALLBACK_IMAGE,
    textValue,
    escapeHTML,
    safeUrl,
    normalizeTags,
    safeIconClass,
    normalizeId,
    normalizeProject,
    normalizeService,
    normalizeTestimonial,
    normalizeMessage,
    formatDate
};

window.AppDB = {
    initDB,
    populateDefaultsIfEmpty,
    countStore,
    getAllFromStore,
    addToStore,
    updateInStore,
    deleteFromStore,
    clearStore,
    signInAdmin,
    signOutAdmin,
    getAdminSession,
    isSupabaseConfigured,
    getMode: () => dbMode,
    getClient: () => cloudDb,
    defaultData: cloneDefaultData
};

