import cors from "cors";

const rawDomains = process.env['AUTHORIZED_DOMAINS'];
export const authorizedDomains = rawDomains ? rawDomains.split(',') : [];

export default cors({
    origin: authorizedDomains,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
})