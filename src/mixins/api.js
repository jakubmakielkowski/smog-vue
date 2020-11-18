export default {
  data() {
    return {
      apiRequestPerformed: false,
      apiResponseError: false,
      apiResponseEmpty: false,
      apiResponseSuccess: false
    };
  },
  computed: {
    apiResponseLoading() {
      return this.apiRequestPerformed && !this.apiResponseError && !this.apiResponseEmpty && !this.apiResponseSuccess;
    }
  },
  methods: {
    clearApiResonse() {
      this.apiRequestPerformed = false;
      this.apiResponseError = false;
      this.apiResponseEmpty = false;
      this.apiResponseSuccess = false;
    }
  }
};
