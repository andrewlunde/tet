// prettier-ignore
import { FormInputs, getErrorMessage, getInputStatus, updateFormFromBlur, updateFormFromChange, updateFormFromSubmit } from 'helpers/form'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { LoginInputs } from 'shared/user/Login'
import { GridTitle, ModalCard, ModalCardContent, ModalClose, ModalMask, ModalStyled } from 'styles'

import { Button } from '../Button/Button.controller'
import { Input } from '../Input/Input.controller'
import { InputSpacer } from '../Input/Input.style'
import { SellModalSpacer } from './SellModal.style'

type SellModalViewProps = {
  loading: boolean
  showing: boolean
  newKeyCallback: (newKey: any) => void
  hideCallback: () => void
}

export const SellModalView = ({ loading, showing, newKeyCallback, hideCallback }: SellModalViewProps) => {
  const [form, setForm] = React.useState<FormInputs>({
    price: { value: '' },
    key: { value: '' },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromChange(e, form, LoginInputs)
    setForm(updatedForm)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedForm = updateFormFromBlur(e, form)
    setForm(updatedForm)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    const updatedForm = updateFormFromSubmit(event, form, LoginInputs)

    if (!updatedForm.price.error && !updatedForm.key.error)
      newKeyCallback({
        price: parseFloat(updatedForm.price.value),
        key: updatedForm.key.value,
      })
    else setForm(updatedForm)
  }

  return (
    <ModalStyled showing={showing}>
      {showing && (
        <>
          <ModalMask showing={showing} onClick={() => hideCallback()} />
          <ModalCard>
            <ModalClose onClick={() => hideCallback()}>
              <svg>
                <use xlinkHref="/icons/sprites.svg#close" />
              </svg>
            </ModalClose>
            <ModalCardContent width={40}>
              <GridTitle>
                <h1>Sell your key</h1>
              </GridTitle>
              <SellModalSpacer />
              <form onSubmit={handleSubmit}>
                <Input
                  icon="price"
                  name="price"
                  placeholder="Price (HBAR)"
                  type="text"
                  onChange={handleChange}
                  value={form.price.value}
                  onBlur={handleBlur}
                  inputStatus={getInputStatus(form.price)}
                  errorMessage={getErrorMessage(form.price)}
                />
                <Input
                  icon="key"
                  name="key"
                  placeholder="Key XXXX-XXXX-XXXXX"
                  onChange={handleChange}
                  value={form.key.value}
                  onBlur={handleBlur}
                  inputStatus={getInputStatus(form.key)}
                  errorMessage={getErrorMessage(form.key)}
                />
                <InputSpacer />
                <Button type="submit" text="Submit" icon="arrow" loading={loading} />
              </form>
            </ModalCardContent>
          </ModalCard>
        </>
      )}
    </ModalStyled>
  )
}

SellModalView.propTypes = {
  loading: PropTypes.bool,
  showing: PropTypes.bool.isRequired,
  newKeyCallback: PropTypes.func.isRequired,
  hideCallback: PropTypes.func.isRequired,
}

SellModalView.defaultProps = {
  loading: false,
}
