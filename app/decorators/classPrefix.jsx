
function classPrefix(prefix) {
    return (ComposedComponent) => {
        Object.assign(ComposedComponent.prototype, {
            addPrefix(className) {
                return prefix + '-' + className;
            },
            getPrefix() {
                return prefix;
            },
        });
    };
}


export default classPrefix;
