import { observable, action, runInAction } from 'mobx'
import LocationsService from '../services/LocationsService'
import GenderService from '../services/GenderService'
import CategoriesPetsService from '../services/CategoriesPetsService'

class InitialFormFiltersStore {
  constructor() {
    this.locationsService = new LocationsService()
    this.genderServices = new GenderService()
    this.categoriesPetsService = new CategoriesPetsService()
  }

  @observable city = ''
  @observable gender = ''
  @observable cities = []
  @observable country = ''
  @observable category = ''
  @observable countries = []
  @observable typeGender = []
  @observable categoriesPets = []
  @observable isLoading = false

  @action
  async listContries() {
    this.setLoading()

    try {
      const response = await this.locationsService.getCountries()

      runInAction(() => {
        this.countries = response[0].countries

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setCities() {
    if (this.country === 'united states') {
      this.listCitiesUnitedState()
    }
    if (this.country === 'argentina') {
      this.listCitiesArgentina()
    }
  }

  @action
  async listCitiesUnitedState() {
    this.setLoading()

    try {
      const response = await this.locationsService.getCitiesUnitedState()

      runInAction(() => {
        this.cities = response[0].cities

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listCitiesArgentina() {
    this.setLoading()

    try {
      const response = await this.locationsService.getCitiesArgentina()

      runInAction(() => {
        this.cities = response[0].cities

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listGender() {
    this.setLoading()

    try {
      const response = await this.genderServices.getGender()

      runInAction(() => {
        this.typeGender = response[0].gender

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listCategoriesPets() {
    this.setLoading()

    try {
      const response = await this.categoriesPetsService.getTypePets()

      this.setLoading()
      runInAction(() => {
        this.categoriesPets = response[0].categories
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setLoading() {
    this.isLoading = !this.isLoading
  }

  @action
  setCountry(value) {
    this.country = value.value
  }

  @action
  setCity(value) {
    this.city = value.value
  }

  @action
  setGender(value) {
    this.gender = value.value
  }

  @action
  setCategory(value) {
    this.category = value.value
  }
}

export default InitialFormFiltersStore