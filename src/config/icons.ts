import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faComment, faInfoCircle, faCheckCircle, faExclamationCircle, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add([
    faComment, faInfoCircle, faCheckCircle, faExclamationCircle, faTimesCircle,
]);

interface IconMap {
    message: IconDefinition;
    primary: IconDefinition;
    info: IconDefinition;
    success: IconDefinition;
    warning: IconDefinition;
    danger: IconDefinition;
}

const iconMap: IconMap = {
    message: faComment,
    primary: faComment,
    info: faInfoCircle,
    success: faCheckCircle,
    warning: faExclamationCircle,
    danger: faTimesCircle,
};

export default iconMap;
