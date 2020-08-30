export async function getUrl(id) {
  const {
    data: res
  } = await this.$http.get('/song/url?id=' + id);
  return res;
}
