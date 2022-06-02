const useUser = () => {
    const user = useLocalStorage<User | EmptyUser>("user", { user: null });
    const signedIn = computed<boolean>(() => user.value.user !== null);

    const login = async() => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
            provider.addScope("https://www.googleapis.com/auth/youtube");

            const result = await signInWithPopup(auth, provider);

            user.value = result as unknown as User;
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async() => {
        const { subscriptions } = useYoutube();

        await auth.signOut();
        user.value = { user: null };
        subscriptions.value = [];
    };

    return {
        user,
        signedIn,
        login,
        logout
    };
};

export { useUser };
export default useUser;
