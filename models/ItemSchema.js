const mongoose = require("mongoose")
const schema = mongoose.Schema

const tiposCirurgia = Object.freeze({
Acromio: "ACROMIO",
AcromioBio: "ACROMIO BIO",
ArtroscopiaCotovelo: "ARTROSCOPIA DE COTOVELO",
ArtroscopiaQuadril: "ARTROSCOPIA DE QUADRIL",
ArtroscopiaTornozelo: "ARTROSCOPIA DE TORNOZELO",
Biceps: "BICEPS",
BicepsBio: "BICEPS BIO",
FxClavicula: "FX CLAVICULA",
FxFalange: "FX FALANGE",
FxFemurDistal: "FX FEMUR DISTAL",
FxFemurProximal: "FX FEMUR PROXIMAL",
FxPatela: "FX PATELA",
FxPe: "FX PÉ",
FxPunho: "FX PUNHO",
FxTibia: "FX TIBIA",
FxTornozelo: "FX TORNOZELO",
FxHumeroDistal: "FX HUMERO DISTAL",
FxHumeroProximal: "FX HUMERO PROXIMAL",
HalluxValgus: "HALLUX VALGUS",
Instabilidade: "INSTABILIDADE",
InstabilidadeBio: "INSTABILIDADE BIO",
Labral: "LABRAL",
LabralBio: "LABRAL BIO",
Lac: "LAC",
Lal: "LAL",
LalBio: "LAL BIO",
Lca: "LCA",
LcaBio: "LCA BIO",
Lcm: "LCM",
LcmBio: "LCM BIO",
Lcp: "LCP",
LcpBio: "LCP BIO",
LigamentoTornozelo: "LIGAMENTO TORNOZELO",
Lpfm: "LPFM",
LpfmBio: "LPFM BIO",
Manguito: "MANGUITO",
ManguitoBio: "MANGUITO BIO",
Menisco: "MENISCO",
Osteotomia: "OSTEOTOMIA",
Oxford: "OXFORD",
PePlano: "PE PLANO",
Ptj: "PTJ",
PtoReversa: "PTO REVERSA",
PtoAnatomica: "PTO ANATOMICA",
PtqDupla: "PTQ DUPLA MOBILIDADE",
PtqHibrida: "PTQ HIBRIDA",
PtqPressfit: "PTQ PRESFIT",
PtqRevisao: "PTQ REVISÃO",
Retirada: "RETIRADA",
TendaoAquiles: "TENDAO DE AQUILES",
Tenoplastia: "TENOPLASTIA"
})

const itemSchema = new schema({
    codigo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        requred: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    tipoCirurgia:{
       type: String,
       enum: Object.values(tiposCirurgia)
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

Object.assign(itemSchema.static, { tiposCirurgia })

mongoose.model("itens", itemSchema)