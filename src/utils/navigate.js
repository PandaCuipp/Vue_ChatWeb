import router  from "../router";

export function navigateTo(name, query = {}, params = {}) {
    router.push({name, query, params})
}

export function redirectTo(path, query = {}, params = {}) {
    router.replace({name, query, params})
}

