export const wrapper = async response => {
    if (response.ok) return await response.json();
    else throw new Error(await response.json().message || 'An unexpected error occured');
}