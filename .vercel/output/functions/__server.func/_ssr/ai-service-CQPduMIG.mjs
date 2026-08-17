import { c as DEMO_PREDICTIONS, t as DEMO_AGENTS, u as DEMO_SIMULATION } from "./demo-data-B2rfthtF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-service-CQPduMIG.js
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var aiService = {
	async listPredictions() {
		await delay(220);
		return DEMO_PREDICTIONS;
	},
	async listAgents() {
		await delay(140);
		return DEMO_AGENTS;
	},
	async runSimulation(minutes) {
		await delay(180);
		return DEMO_SIMULATION.map((step) => step.actor === "Environment" && step.title === "Traffic increases" ? {
			...step,
			detail: `${step.detail} (horizon: ${minutes} min)`
		} : step);
	}
};
//#endregion
export { aiService as t };
