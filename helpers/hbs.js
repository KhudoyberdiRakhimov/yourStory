const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        } 
        return str
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue">
                        <i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },
    likeStory: function (storyId, loggedUser) {
        const _id = storyId
        const userId = loggedUser._id
        return `<form action="/stories/like/${_id}/${userId}" method="POST" id="like-form">
                    <input type="hidden" name="_method" value="PUT">
                    <button type="submit" class="btn-flat">
                        <i class="far fa-heart heart-button"></i>
                    </button>
                </form>`
    },
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },
    addComment: function (storyId, loggedUser) {
        const _id = storyId
        const userId = loggedUser._id
        return `<form action="/stories/comment/${_id}/${userId}" method="POST" class="col s12">
                    <input type="hidden" name="_method" value="PUT">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">textsms</i>
                            <input type="text" name="autocompleteInput" id="autocompleteInput" class="autocomplete">
                            <label for="autocompleteInput">Leave comment...</label>
                        </div>
                    </div>
                    <div class="row">
                        <input type="submit" value="Save" class="btn green">
                        <a href="/stories/{{story._id}}" class="btn orange">Cancel</a>
                    </div>
                </form>`
    }
}