import axios from 'axios';

const baseUrl =  'http://tintoria.net.br/api';

export async function defaultRequest(request) {
	const xmls = `<?xml version="1.0" encoding="UTF-8"?>
      <SOAP-ENV:Envelope
        xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
        SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <SOAP-ENV:Body>
        ${request}
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`;

		console.log(xmls);

	try {
		const response = await axios.post(
			`${baseUrl}/tintoria_soapserver.php?wsdl`,
			xmls,
			{headers: {'Content-Type': 'application/xml'}},
		);
		console.log(response.data);

		const res = JSON.parse(
			response.data.substring(
				response.data.indexOf('<return xsi:type="xsd:string">') +
					'<return xsi:type="xsd:string">'.length,
				response.data.indexOf('</return>'),
			),
		);
		if (res.err_msg) {
			return {
				error: true,
				message: `${res.err_msg}`,
			};
		}  else {
			return {
				error: false,
				data: res
			}
		}
	} catch (error) {
		return {
			error: true,
			message: `${error}`,
		};
	}
}

export async function getConnection(uid) {  
  let xmls = `<m:BOSS_getConexaoJSON xmlns:m="${baseUrl}/BOSS_getConexaoJSON">
    <uid>${uid}</uid>
  </m:BOSS_getConexaoJSON>`
  return defaultRequest(xmls);
}

export async function getCRTotal(gdb, dbp) {  
  let xmls = `<m:BOSS_getCR_TotalJSON xmlns:m="${baseUrl}/BOSS_getCR_TotalJSON">
    <gdb>${gdb}</gdb>
    <dbp>${dbp}</dbp>
  </m:BOSS_getCR_TotalJSON>`
  return defaultRequest(xmls);
}

export async function getCRClients(gdb, dbp, inactive) {  
  let xmls = `<m:BOSS_getCR_ClientesJSON xmlns:m="${baseUrl}/BOSS_getCR_ClientesJSON">
    <gdb>${gdb}</gdb>
    <dbp>${dbp}</dbp>
    <CLI_INATIVO>${inactive}</CLI_INATIVO>
  </m:BOSS_getCR_ClientesJSON>`
  return defaultRequest(xmls);
}

export async function getDebit(gdb, dbp, client, entryDate1, entryDate2, exitDate1, exitDate2) {  
  let xmls = `<m:BOSS_relDemonstrativoDebitoJSON xmlns:m="${baseUrl}/BOSS_relDemonstrativoDebitoJSON">
		<gdb>${gdb}</gdb>
		<dbp>${dbp}</dbp>
    <cli>${client}</cli>
    <dei>${entryDate1}</dei>
    <def>${entryDate2}</def>
    <dsi>${exitDate1}</dsi>
    <dsf>${exitDate2}</dsf>
  </m:BOSS_relDemonstrativoDebitoJSON>`
  return defaultRequest(xmls);
}

export async function getAnnualInvoice(gdb, dbp) {  
  let xmls = `<m:BOSS_getFaturamentoAnualJSON xmlns:m="${baseUrl}/BOSS_getFaturamentoAnualJSON">
		<gdb>${gdb}</gdb>
		<dbp>${dbp}</dbp>
  </m:BOSS_getFaturamentoAnualJSON>`
  return defaultRequest(xmls);
}
