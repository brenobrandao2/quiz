import React, { useEffect, useState } from 'react';

import X_IMG from '../assets/x.png'
import Tooltip from '../components/Tooltip';
import { getImages, insertImage } from '../repository/quiz.repository';

const Logo = () => {
    const [logoPreview, setLogoPreview] = useState()
    const [logo, setLogo] = useState()
    const [faviconPreview, setFaviconPreview] = useState()
    const [favicon, setFavicon] = useState()
    const [loading, setLoading] = useState(false)

    const [tooltipProps, setTooltipProps] = useState({
        text: '',
        show: false
    })
    const showTooltip = (text, duration = 5000) => {
        setTooltipProps({
            text,
            show: true
        })
        setTimeout(() => {
            setTooltipProps({
                text: '',
                show: false
            })
        },duration)
    }

    useEffect(() => {
        const setImages = async () => {
            setLoading(true)
            const allImages = await getImages()
            const logoDoc = allImages.find(image => image.tipo === 'logo')
            const faviconDoc = allImages.find(image => image.tipo === 'favicon')
            
            if (logoDoc) {
                setLogoPreview(`data:${logoDoc.logo.mimetype};base64,${logoDoc.logo.buffer}`)
                setLogo(logoDoc.logo)
            }
            if (faviconDoc) {
                setFaviconPreview(`data:${faviconDoc.favicon.mimetype};base64,${faviconDoc.favicon.buffer}`)
                setFavicon(faviconDoc.favicon)
            }
            setLoading(false)
        }

        setImages()
    },[])

    const getLogoPreview = (imagem) => {
        if (imagem) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imagem)
            fileReader.addEventListener('load', (e) => {
                setLogoPreview(e.target.result)
            })
        }
    }

    const getFaviconPreview = (imagem) => {
        if (imagem) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imagem)
            fileReader.addEventListener('load', (e) => {
                setFaviconPreview(e.target.result)
            })
        }
    }

    const save = async () => {
        if (!logo || !favicon) showTooltip('Preencha todos os campos')
        else {
            setLoading(true)
            try {
                await insertImage(logo, favicon)
                showTooltip('Salvo')
            } catch(error) {
                showTooltip('Falha ao salvar')
            }
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="CreateFinalCard-container">
                <div className="Logs-LoaderArea">
                    <div className="Logs-loader"/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="CreateFinalCard-container">
                <div className="CreateFinalCard-inputArea">
                    <label>Logo:</label>
                    <div className="CreateQuiz-imageArea">
                        {logoPreview && <img alt='quiz_img' src={logoPreview} className="CreateQuiz-image"/>}
                        {logo ?
                            <img alt='x_img' src={X_IMG} className="CreateFinalCard-xBtn" onClick={() => {
                                setLogo(undefined)
                                setLogoPreview(undefined)
                            }}/>
                            :
                            <input type="file" accept="image/png, image/jpeg" name="image" onChange={(e) => {
                                setLogo(e.target.files[0])
                                getLogoPreview(e.target.files[0])
                            }}/>
                        }
                    </div>
                </div>
                <div className="CreateFinalCard-inputArea">
                    <label>Favicon:</label>
                    <div className="CreateQuiz-imageArea">
                        {faviconPreview && <img alt='quiz_img' src={faviconPreview} className="CreateQuiz-image"/>}
                        {favicon ?
                            <img alt='x_img' src={X_IMG} className="CreateFinalCard-xBtn" onClick={() => {
                                setFavicon(undefined)
                                setFaviconPreview(undefined)
                            }}/>
                            :
                            <input type="file" accept="image/png, image/jpeg" name="image" onChange={(e) => {
                                setFavicon(e.target.files[0])
                                getFaviconPreview(e.target.files[0])
                            }}/>
                        }
                    </div>
                </div>
                <div className="CreateFinalCard-buttonArea">
                    <input type="button" className="CreateFinalCard-button" value="Salvar" onClick={() => save()}></input>
                </div>
                <Tooltip {...tooltipProps}/>
            </div>
        );
    }

};

export default Logo;