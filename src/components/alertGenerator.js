import {
    AlertError,
    AlertSuccess,
    AlertWarning,
    AlertInfo,
} from './alert'

function AlertGenerator(props) {
    const { message, status } = props
    switch (status) {
        case 'error':
            return <AlertError message={message} />
        case 'success':
            return <AlertSuccess message={message} />
        case 'warning':
            return <AlertWarning message={message} />
        case 'info':
            return <AlertInfo message={message} />
        default:
            return null
    }
}

export default AlertGenerator