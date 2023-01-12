const { createApp } = Vue


createApp({
    data() {
        return {
            message: 'Hello Vue!',
            url: "https://vue3-course-api.hexschool.io/v2",
            api_path: "yu_",
            username: "",
            password: ""
        }
    },
    methods: {
        userSignIn(e) {
            const userInputValue = {
                username: this.username,
                password: this.password
            }
            //接登入api，帶使用者輸入值
            axios.post(`${this.url}/admin/signin`, userInputValue)
                .then((res) => {
                    //解構，把token跟expired取出，變成可以在這一層用的變數
                    const { token, expired } = res.data;
                    //把token跟expired存放在cookie中
                    document.cookie = `hexschool=${token};expires=${expired}`;
                    location.href="./product.html"

                })
                .catch((err) => {
                    console.log(err.response);
                })

        },

    }


}).mount("#app")