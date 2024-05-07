const mongoose = require("mongoose")
const schema = mongoose.Schema

const tiposCirurgia = Object.freeze({
    Acromio: "Acromio",
    AcromioBio: "Acromio Bio",
    ArtroscopiaCotovelo: "Artroscopia de Cotovelo",
    ArtroscopiaQuadril: "Artroscopia de Quadril",
    ArtroscopiaTornozelo: "Artroscopia de Tornozelo",
    Biceps: "Biceps",
    BicepsBio: "Biceps Bio",
    FxClavicula: "FX Clavicula",
    FxFalange: "FX Falange",
    FxFemurDistal: "FX Femur Distal",
    FxFemurProximal: "FX Femur Proximal",
    FxPatela: "FX Patela",
    FxPe: "FX Pé",
    FxPunho: "FX Punho",
    FxTibia: "FX Tibia",
    FxTornozelo: "FX Tornozelo",
    FxHumeroDistal: "FX Humero Distal",
    FxHumeroProximal: "FX Humero Proximal",
    HalluxValgus: "Hallux Valgus",
    Instabilidade: "Instabilidade",
    InstabilidadeBio: "Instabilidade Bio",
    Labral: "Labral",
    LabralBio: "Labral BIo",
    Lac: "LAC",
    Lal: "LAL",
    LalBio: "LAL Bio",
    Lca: "LCA",
    LcaBio: "LCA Bio",
    Lcm: "LCM",
    LcmBio: "LCM Bio",
    Lcp: "LCP",
    LcpBio: "LCP Bio",
    LigamentoTornozelo: "Ligamento Tornozelo",
    Lpfm: "LPFM",
    LpfmBio: "LPFM Bio",
    Manguito: "Manguito",
    ManguitoBio: "Manguito Bio",
    Menisco: "Menisco",
    Osteotomia: "Osteotomia",
    Oxford: "Oxford",
    PePlano: "Pe Plano",
    Ptj: "PTJ",
    PtoReversa: "PTO Reversa",
    PtoAnatomica: "PTO Anatomica",
    PtqDupla: "PTQ Dupla Mobilidade",
    PtqHibrida: "PTQ Hibrida",
    PtqPressfit: "PTQ Presfit",
    PtqRevisao: "PTQ Revisao",
    Retirada: "Retirada",
    TendaoAquiles: "Tendao de Aquiles",
    Tenoplastia: "Tenoplastia"
})

const agendamentoSchema = new schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pacientes",
        requered: true
    },
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicos",
        requred: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospitais",
        requered: true
    },
    dataCirurgia: {
        type: Date,
        required: true
    },
    tipoCirurgia: {
        type: String,
        enum: Object.values(tiposCirurgia)
    },
    itensSolicitados: [{
        idItem: {
            type: mongoose.Schema.ObjectId,
            ref: "itens",

        },
        quantidade: {
            type: Number,

        }
    }]
})

Object.assign(agendamentoSchema.static, { tiposCirurgia })

mongoose.model("agendamentos", agendamentoSchema)