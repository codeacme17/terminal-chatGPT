import _axios from "@/plugins/axios"

const TEST_API = {
  test() {
    return _axios({
      method: "GET",
      url: "/api/test",
    })
  },
}

export default TEST_API
