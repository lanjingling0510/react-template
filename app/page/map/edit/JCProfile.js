import React, { PropTypes, Component } from 'react';
import FormEditor from '../../../components/FormEditor.js';


class JCProfile extends Component {
    static propTypes = {
        profile: PropTypes.object.isRequired,
        onSaveJCProfile: PropTypes.func.isRequired,
    }

    render() {
        const {profile, onSaveJCProfile} = this.props;
        return (
            <FormEditor
                data={profile}
                onSave={onSaveJCProfile}/>
        );
    }
}

export default JCProfile;
