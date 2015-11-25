function modalDecorator(ComposedComponent) {
    Object.assign(ComposedComponent.prototype, {
        showModal: function (params) {
            const modal = this.state.modal;
            const onComplete = () => {
                const newModal = this.state.modal;
                this.setState({
                    modal: {
                        ...newModal,
                        active: false,
                    },
                });
            };

            this.setState({
                modal: {
                    ...modal,
                    ...params,
                    active: true,
                    onConfirm: () => {
                        params.onConfirm && params.onConfirm();
                        onComplete();
                    },
                    onCancel: () => {
                        onComplete();
                    },
                },
            });
        },
    });
}

export default modalDecorator;
