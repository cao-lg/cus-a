export const getConnectorId = (props) => {
    const { project } = props;
    const { mode, connectorId } = project || {};
    if (mode === "websdk") {
        return "999";
    }
    else if (mode === "draft") {
        return "10000010";
    }
    return connectorId || "";
};
//# sourceMappingURL=get-connector-id.js.map