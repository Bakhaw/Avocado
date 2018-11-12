import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import RecetteFormTemplate from './RecetteFormTemplate';

class RecetteForm extends Component {
  // TODO, make this Component working with <CreateRecetteForm /> Component

  render() {
    const { defaultValue, handleFormSubmit, handleInputChange } = this.props;
    return (
      <div className='create-recette-container'>
        <form className='create-recette-form' onSubmit={handleFormSubmit}>
          {RecetteFormTemplate.map((item, index) => {
            const { inputText, multiline, name, type, value } = item;
            return (
              <TextField key={index}
                label={inputText}
                multiline={multiline}
                name={name}
                onChange={handleInputChange}
                rowsMax='5'
                type={type}
                defaultValue={defaultValue[value]}
                variant='outlined'
              />
            )
          })}

          {/* !! Ne pas mettre de <Fragment> ici, laisser <div> !! */}
          <div>
            <label htmlFor='recette-image-input'>
              Image de votre recette
                  <input id='recette-image-input'
                name='recetteImage'
                onChange={this.handleInputChange}
                type='file'
              />
            </label>
          </div>
          {/* !! Ne pas mettre de <Fragment> ici, laisser <div> !! */}

          <Button className='create-recette__submit-button'
            type='submit'
            variant='contained'>
            Ajouter une recette
          </Button>
        </form>

      </div>
    )
  }
}

export default RecetteForm;