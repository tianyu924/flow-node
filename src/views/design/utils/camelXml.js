export const inputCamel = (node = null) => {
  if (node) {
    return `<route id="${node.id}" routeConfigurationId="xmlError">
              <from uri="rest:${node.data.method}:${node.data.uri}"/>
              <to uri="connector://conn-in?id=${node.data.connectorId}"/>
              <to uri="direct://${node.nextNode.id}"/>
            </route>`
  } else {
    return `<route></route>`
  }
}