import { ObjectId } from 'mongodb'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Key } from 'shared/key/Key'
import { KeyUser } from 'shared/key/KeyUser'
// prettier-ignore
import { GridTitle, ModalCard, ModalCardContent, ModalClose, ModalMask, ModalStyled, textColor, ModalCardText, ModalCardH1, ModalA } from 'styles'

import { Button } from '../Button/Button.controller'
import { Loader } from '../Loader/Loader.view'
// prettier-ignore

import { BuyModalNoKey, BuyModalSeller, BuyModalSellerBuyButton, BuyModalSellerImg, BuyModalSellerKeyPrice, BuyModalSellerName } from './BuyModal.style'

type BuyModalViewProps = {
  loading: boolean
  showing: boolean
  sellers: KeyUser[]
  purchasedKey?: Key
  transactionHash?: string
  hideCallback: () => void
  sellCallback: () => void
  buyCallback: (keyId: ObjectId) => void
}

export const BuyModalView = ({
  loading,
  showing,
  sellers,
  purchasedKey,
  transactionHash,
  hideCallback,
  sellCallback,
  buyCallback,
}: BuyModalViewProps) => {
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
            {purchasedKey ? (
              <ModalCardContent>
                <ModalCardText>Your video key:</ModalCardText>
                <ModalCardH1>{purchasedKey.key}</ModalCardH1>
                <ModalCardText>HBAR transaction explorer:</ModalCardText>
                <ModalA href={`https://explorer.kabuto.sh/testnet/id/${transactionHash}`} target="_blank">
                  {transactionHash}
                </ModalA>
              </ModalCardContent>
            ) : (
              <ModalCardContent width={70} height={70}>
                <GridTitle>
                  <h1>Sellers</h1>
                  <Button text="Sell your key" textColor={textColor} icon="shop" onClick={() => sellCallback()} />
                </GridTitle>
                {loading ? (
                  <Loader />
                ) : (
                  <div>
                    {sellers.length === 0 ? (
                      <BuyModalNoKey>No Key available</BuyModalNoKey>
                    ) : (
                      <div>
                        {sellers.map((seller) => (
                          <BuyModalSeller key={(seller.key._id as any) as string}>
                            <BuyModalSellerImg alt="seller" src={seller.user?.profilePicture} />
                            <BuyModalSellerName>
                              <div>{`${seller.user?.username}`}</div>
                              <p>
                                {seller.user?.sellCount || 0} sell
                                {seller.user?.sellCount && seller.user?.sellCount > 1 ? 's' : ''}
                              </p>
                            </BuyModalSellerName>
                            <BuyModalSellerKeyPrice>
                              <div>{`HBAR ${seller.key.price}`}</div>
                              <p>{`$${(seller.key.price * 0.2).toFixed(2)}`}</p>
                            </BuyModalSellerKeyPrice>
                            <BuyModalSellerBuyButton onClick={() => buyCallback(seller.key._id)}>
                              Buy with HEDERA ℏ
                            </BuyModalSellerBuyButton>
                          </BuyModalSeller>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </ModalCardContent>
            )}
          </ModalCard>
        </>
      )}
    </ModalStyled>
  )
}

BuyModalView.propTypes = {
  loading: PropTypes.bool,
  showing: PropTypes.bool.isRequired,
  sellers: PropTypes.array.isRequired,
  purchasedKey: PropTypes.object,
  hideCallback: PropTypes.func.isRequired,
  sellCallback: PropTypes.func.isRequired,
  buyCallback: PropTypes.func.isRequired,
}

BuyModalView.defaultProps = {
  loading: false,
}
