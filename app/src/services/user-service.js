userService.$inject = ['$resource', 'apiUrl'];

// don't mix in $resource for only one thing. Better to just spell it out.
export default function userService($resource, apiUrl) {
    return $resource(`${apiUrl}/users/`, null, {'update': {method: 'PUT'}});
}