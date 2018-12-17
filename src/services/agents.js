import request from "@/utils/request";
import pathConfig from "./pathConfig";
import { stringify } from "querystring";

export async function queryAgents(params) {
  return request(`${pathConfig.QueryAgents}?${stringify(params)}`);
}

export async function queryAgentChilds(params) {
  return request(`${pathConfig.QueryAgentChilds}?${stringify(params)}`);
}

export async function queryAgentRewards(params) {
  return request(`${pathConfig.QueryAgentRewards}?${stringify(params)}`);
}

export async function queryAgentDetails(id) {
  return request(`${pathConfig.QueryAgents}/${id}`);
}

export async function updateAgent(params) {
  const { id } = params;
  return request(`${pathConfig.QueryAgents}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function createAgent(params) {
  return request(`${pathConfig.QueryAgents}`, {
    method: 'POST',
    body: params,
  });
}

export async function queryAgentConfigs(params) {
  return request(`${pathConfig.QueryAgentConfigs}?${stringify(params)}`);
}

export async function queryAgentConfigDetails(id) {
  return request(`${pathConfig.QueryAgentConfigs}/${id}`);
}

export async function createAgentConfig(params) {
  return request(`${pathConfig.QueryAgentConfigs}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateAgentConfig(params) {
  const { id } = params;
  return request(`${pathConfig.QueryAgentConfigs}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteAgentConfig(id) {
  return request(`${pathConfig.QueryAgentConfigs}/${id}`, {
    method: 'DELETE',
  });
}