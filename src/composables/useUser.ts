const useUser = () => {
    const user = useLocalStorage<User | EmptyUser>("user", { user: null });
    const signedIn = computed<boolean>(() => user.value.user !== null);

    const login = async() => {
        const { getUserChannel } = useYoutube();

        watchOnce(user, async() => {
            await getUserChannel();
        });

        try {
            const provider = new GoogleAuthProvider();
            provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
            provider.addScope("https://www.googleapis.com/auth/youtube");

            const result = await signInWithPopup(auth, provider);

            user.value = result;
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async() => {
        const { subscriptions, userChannel } = useYoutube();

        await auth.signOut();
        user.value = { user: null };
        subscriptions.value = [];
        userChannel.value = { userChannel: null };
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
