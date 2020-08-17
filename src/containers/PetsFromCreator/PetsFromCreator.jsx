import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import UserContext from 'Context/UserContext'
import { MdSearch } from 'react-icons/md'
import { LIMIT_LIST } from 'services/config'
import ListPets from 'components/ListPets'
import Input from 'components/commons/Input'
import Title from 'components/commons/Title'
import PaginationList from 'components/commons/PaginationList'

const PetsFromCreator = ({ id, title }) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const rootStore = useContext(UserContext)
  const { searchPetsStore } = rootStore

  useEffect(() => {
    searchPetsStore.getPetsForAdoption(id, LIMIT_LIST, page, '')
  }, [])

  const handleChangePage = useCallback((e, newPage) => {
    searchPetsStore.getPetsForAdoption(id, LIMIT_LIST, newPage, '')
    setPage(newPage)
  }, [])

  const handleSearch = useCallback(e => {
    searchPetsStore.getPetsForAdoption(id, LIMIT_LIST, page, e.target.value)
  }, [])

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={title} />
      <Input
        isEdit
        handleChange={handleSearch}
        icon={<MdSearch size={20} />}
        placeholder={t('common:filterForName')}
      />
      <ListPets isLoading={searchPetsStore.isLoading} pets={searchPetsStore.petsForAdoption} />
      {searchPetsStore.totalPetsForAdoption !== 0 && (
        <PaginationList
          page={page}
          limit={limit}
          handleChange={handleChangePage}
          total={searchPetsStore.totalPetsForAdoption}
        />
      )}
    </>
  )
}

PetsFromCreator.prototype = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default observer(PetsFromCreator)